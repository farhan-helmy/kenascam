import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Script from 'next/script';
import Provider from './provider';
import { Toaster } from '@/components/ui/sonner'

const inter = Inter({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  description: 'Malaysia scam directory',
  title: 'KenaScam',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Script src="https://beamanalytics.b-cdn.net/beam.min.js" data-token="985d914f-a13a-4d21-9289-bf51f9d27097" async />
      <Provider>
        <body className={inter.className}>
          <main>
            {children}
          </main>
          <Toaster />
        </body>
      </Provider>
    </html>
  );
}
