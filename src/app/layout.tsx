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
  themeColor: '#095160',
};

export const metadata: Metadata = {
  title: 'Tradewell Home — All Home Services',
  description: 'Tradewell Home is Arkansas\' trusted home services directory. Compare local roofing, plumbing, HVAC, electrical, cleaning and landscaping professionals across 63 categories.',
  icons: {
    icon: '/assets/img/tradewell-home-mark.png',
    apple: '/assets/img/tradewell-home-mark.png',
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
