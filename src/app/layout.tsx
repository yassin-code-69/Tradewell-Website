import type { Metadata, Viewport } from 'next';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-inter',
  display: 'swap',
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['700', '800'],
  variable: '--font-plus-jakarta',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#0E3446',
};

export const metadata: Metadata = {
  title: 'Tradewell — Find Trusted Home Service Professionals in Arkansas',
  description: 'Tradewell is a home services directory for Arkansas homeowners. Compare local roofing, plumbing, HVAC, electrical, cleaning and landscaping professionals across 63 categories.',
  icons: {
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='7' fill='%230E3446'/%3E%3Cg fill='none' stroke='%23F5A623' stroke-width='2' stroke-linecap='round'%3E%3Ccircle cx='16' cy='16' r='3.4' fill='%23F5A623'/%3E%3Cpath d='M16 12.6V9.8M16 19.4v2.8M12.6 16H9.8M19.4 16h2.8'/%3E%3Ccircle cx='16' cy='7' r='2.2'/%3E%3Ccircle cx='16' cy='25' r='2.2'/%3E%3Ccircle cx='7' cy='16' r='2.2'/%3E%3Ccircle cx='25' cy='16' r='2.2'/%3E%3C/g%3E%3C/svg%3E",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${plusJakartaSans.variable} scroll-smooth`}>
      <body>
        <a className="skip-link" href="#main">Skip to main content</a>
        <svg width="0" height="0" aria-hidden="true" style={{ position: 'absolute', pointerEvents: 'none' }}>
          <defs>
            <linearGradient id="halfGrad" x1="0" x2="1" y1="0" y2="0">
              <stop offset="50%" stopColor="#F5A623" />
              <stop offset="50%" stopColor="#D5E0E6" />
            </linearGradient>
          </defs>
        </svg>
        {children}
      </body>
    </html>
  );
}
