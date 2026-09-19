import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { uploadImageToStorage, deleteImageFromStorage, optimizeImage, getSupabaseAdmin } from '@/lib/supabaseAdmin';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const folder = (formData.get('folder') as 'contractors' | 'spotlight' | 'general') || 'contractors';

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No image file was provided in the upload.' },
        { status: 400 }
      );
    }

    // Validate mime type
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { success: false, error: 'Uploaded file must be an image (PNG, JPG, WebP, etc.).' },
        { status: 400 }
      );
    }

    // Limit size to 15MB before optimization
    if (file.size > 15 * 1024 * 1024) {
      return NextResponse.json(
        { success: false, error: 'Image size exceeds 15MB limit. Please choose a smaller image.' },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // 1. Try uploading to Supabase Storage if configured
    const supabase = getSupabaseAdmin();
    if (supabase) {
      try {
        const uploadResult = await uploadImageToStorage(buffer, file.name, folder);
        return NextResponse.json({
          success: true,
          url: uploadResult.url,
          storagePath: uploadResult.path,
          fileName: file.name,
          originalSize: file.size,
          optimizedSize: uploadResult.size,
          format: 'webp',
          storage: 'supabase'
        });
      } catch (storageErr: any) {
        console.error('Supabase storage upload failed:', storageErr.message);
        return NextResponse.json(
          { success: false, error: `Supabase Storage upload failed: ${storageErr.message}` },
          { status: 500 }
        );
      }
    }

    // 2. If running on Vercel or cloud serverless, filesystem is read-only
    if (process.env.VERCEL || process.env.NODE_ENV === 'production') {
      return NextResponse.json(
        {
          success: false,
          error: 'Supabase Storage is not configured. Please add NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, and SUPABASE_SERVICE_ROLE_KEY in your Vercel Project Settings > Environment Variables.'
        },
        { status: 500 }
      );
    }

    // 3. Local Development Fallback: Optimize with sharp and save locally to /public/uploads
    const { buffer: optimizedBuffer, size: optimizedSize } = await optimizeImage(buffer);
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    await fs.mkdir(uploadsDir, { recursive: true });

    const cleanFileName = file.name.replace(/\.[^/.]+$/, '').replace(/[^a-zA-Z0-9_-]/g, '_').toLowerCase();
    const uniqueFileName = `${Date.now()}-${cleanFileName}.webp`;
    const filePath = path.join(uploadsDir, uniqueFileName);

    await fs.writeFile(filePath, optimizedBuffer);

    return NextResponse.json({
      success: true,
      url: `/uploads/${uniqueFileName}`,
      fileName: file.name,
      originalSize: file.size,
      optimizedSize,
      format: 'webp',
      storage: 'local'
    });
  } catch (err: any) {
    console.error('Error handling image upload:', err);
    return NextResponse.json(
      { success: false, error: err.message || 'Failed to optimize and upload image.' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    let targetUrl = searchParams.get('url');

    if (!targetUrl) {
      try {
        const body = await req.json();
        targetUrl = body.url;
      } catch {
        // empty body
      }
    }

    if (!targetUrl) {
      return NextResponse.json({ success: false, error: 'Image URL is required for deletion' }, { status: 400 });
    }

    // 1. If it's a Supabase storage URL
    if (targetUrl.includes('supabase.co') || targetUrl.includes('tradewell-media')) {
      const deleted = await deleteImageFromStorage(targetUrl);
      return NextResponse.json({
        success: true,
        deleted,
        storage: 'supabase',
        url: targetUrl
      });
    }

    // 2. If it's a local upload
    if (targetUrl.startsWith('/uploads/')) {
      const fileName = path.basename(targetUrl);
      const filePath = path.join(process.cwd(), 'public', 'uploads', fileName);
      try {
        await fs.unlink(filePath);
      } catch {
        // File may already be removed
      }
      return NextResponse.json({
        success: true,
        deleted: true,
        storage: 'local',
        url: targetUrl
      });
    }

    // Static assets (/assets/...) are protected and not deleted from disk
    return NextResponse.json({
      success: true,
      deleted: false,
      message: 'Static template image references removed from database without deleting base asset.',
      url: targetUrl
    });
  } catch (err: any) {
    console.error('Error deleting image:', err);
    return NextResponse.json(
      { success: false, error: err.message || 'Failed to delete image.' },
      { status: 500 }
    );
  }
}
