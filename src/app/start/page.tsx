import type { Metadata } from 'next';
import Link from 'next/link';
import { bungee } from '../fonts';

export const metadata: Metadata = {
  description: 'Malaysia scam directory',
  title: 'KenaScam',
};

export default function StartPage() {
  return (
    <div className="flex flex-grow items-center justify-center">
      <Link href="/">
        <button className={`text-[50px] ${bungee.className}`}>Kena Scam</button>
      </Link>
    </div>
  );
}
