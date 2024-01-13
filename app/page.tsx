import type { Metadata } from 'next'
import Link from 'next/link'
import { bungee } from './fonts'

export const metadata: Metadata = {
  title: 'KenaScam',
  description: 'Malaysia scam directory',
}

export default function Home() {

  return (
    <>
      <div className="px-auto py-auto flex items-center justify-center h-screen">
        <Link href="/browse">
          <button className={`text-[50px] ${bungee.className}`}>
            Kena Scam
          </button>
        </Link>
      </div>
    
    </>
  )
}
