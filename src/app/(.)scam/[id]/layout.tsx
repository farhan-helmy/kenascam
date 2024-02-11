import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
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
