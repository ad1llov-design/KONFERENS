import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { LanguageProvider } from '@/lib/i18n/context';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

export const metadata: Metadata = {
  title: { default: 'Kivora — Personal Learning Platform', template: '%s · Kivora' },
  description:
    'A personal gamified learning platform for languages, technology, and professional skills with an AI tutor.',
  keywords: ['learning', 'python', 'english', 'tech', 'skills', 'AI tutor', 'kivora'],
};

export const viewport: Viewport = {
  themeColor: '#0A0F18',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-screen flex flex-col bg-background text-foreground">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
