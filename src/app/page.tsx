import type { Metadata } from 'next';
import Link from 'next/link';
import { bungee } from './fonts';

export const metadata: Metadata = {
  description: 'Malaysia scam directory',
  title: 'KenaScam',
};

export default function Home() {
  return (
    <>
      <div className="px-auto py-auto flex h-screen items-center justify-center">
        <Link href="/browse">
          <button className={`text-[50px] ${bungee.className}`}>Kena Scam</button>
        </Link>
      </div>
    </>
  );
}
