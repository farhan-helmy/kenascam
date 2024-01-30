import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { bungee } from './fonts';

export const metadata: Metadata = {
  description: 'Malaysia number 1 scam directory',
  title: 'KenaScam',
};

export default function Home() {
  return (
    <>
      <div className="px-auto py-auto flex flex-col h-screen items-center justify-center">
        <div
          className='flex items-left justify-left'>
          <Image
            alt="Kena Scam"
            className=' text-start'
            height={100}
            src="/clickhere.png"
            width={100}
          />
        </div>

        <Link href="/browse">
          <button className={`text-[50px] ${bungee.className}`}>Kena Scam</button>
        </Link>
      </div>
    </>
  );
}
