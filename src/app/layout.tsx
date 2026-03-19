import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import { AppProviders } from '@/providers';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'React Template PC',
    template: '%s | React Template PC',
  },
  description:
    'Next.js 15 + TypeScript + TailwindCSS + shadcn/ui 기반 PC 프론트엔드 템플릿',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
