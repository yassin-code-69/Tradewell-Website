import { createClient, SupabaseClient } from '@supabase/supabase-js';
import sharp from 'sharp';
import ws from 'ws';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ijvzumttoeejpeosvxiv.supabase.co';
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

let adminClient: SupabaseClient | null = null;

export function getSupabaseAdmin(): SupabaseClient | null {
  if (!supabaseUrl || !serviceRoleKey) {
    return null;
  }
  if (!adminClient) {
    adminClient = createClient(supabaseUrl, serviceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      },
      realtime: {
        transport: ws as any
      }
    });
  }
  return adminClient;
}

export const STORAGE_BUCKET = 'tradewell-media';

/**
 * Optimizes an image buffer using Sharp and converts it to WebP
 * Resizes down to a max dimension of 1600px and compresses with quality 82.
 */
export async function optimizeImage(buffer: Buffer): Promise<{ buffer: Buffer; format: string; size: number }> {
  const optimized = await sharp(buffer)
    .rotate() // auto-orient based on EXIF
    .resize(1600, 1600, {
      fit: 'inside',
      withoutEnlargement: true
    })
    .webp({ quality: 82, effort: 4 })
    .toBuffer();

  return {
    buffer: optimized,
    format: 'webp',
    size: optimized.length
  };
}

/**
 * Uploads an optimized image to Supabase Storage bucket 'tradewell-media'
 */
export async function uploadImageToStorage(
  buffer: Buffer,
  fileName: string,
  folder: 'contractors' | 'spotlight' | 'general' = 'contractors'
): Promise<{ url: string; path: string; size: number }> {
  const supabaseAdmin = getSupabaseAdmin();
  if (!supabaseAdmin) {
    throw new Error('Supabase client is not configured. Please set SUPABASE_SERVICE_ROLE_KEY or NEXT_PUBLIC_SUPABASE_ANON_KEY.');
  }

  // 1. Optimize image buffer with sharp
  const { buffer: optimizedBuffer, size } = await optimizeImage(buffer);

  // 2. Build unique clean filename
  const cleanName = fileName.replace(/\.[^/.]+$/, '').replace(/[^a-zA-Z0-9_-]/g, '_').toLowerCase();
  const filePath = `${folder}/${Date.now()}-${cleanName}.webp`;

  // 3. Ensure bucket exists or upload directly
  const { error: uploadError } = await supabaseAdmin.storage
    .from(STORAGE_BUCKET)
    .upload(filePath, optimizedBuffer, {
      contentType: 'image/webp',
      upsert: true
    });

  if (uploadError) {
    throw new Error(`Failed to upload to Supabase Storage: ${uploadError.message}`);
  }

  // 4. Get permanent public URL
  const { data: urlData } = supabaseAdmin.storage
    .from(STORAGE_BUCKET)
    .getPublicUrl(filePath);

  return {
    url: urlData.publicUrl,
    path: filePath,
    size
  };
}

/**
 * Deletes an image from Supabase Storage by its full URL or relative path
 */
export async function deleteImageFromStorage(urlOrPath: string): Promise<boolean> {
  const supabaseAdmin = getSupabaseAdmin();
  if (!supabaseAdmin || !urlOrPath) return false;

  try {
    let filePath = urlOrPath;

    // If it's a full public URL, extract the path after bucket name
    if (urlOrPath.includes(STORAGE_BUCKET)) {
      const parts = urlOrPath.split(`${STORAGE_BUCKET}/`);
      if (parts.length > 1) {
        filePath = decodeURIComponent(parts[1].split('?')[0]);
      }
    } else if (urlOrPath.startsWith('/uploads/')) {
      // Local legacy upload file
      return false;
    }

    const { error } = await supabaseAdmin.storage
      .from(STORAGE_BUCKET)
      .remove([filePath]);

    if (error) {
      console.warn(`Could not delete image from Supabase storage (${filePath}):`, error.message);
      return false;
    }

    return true;
  } catch (err) {
    console.error('Error in deleteImageFromStorage:', err);
    return false;
  }
}
