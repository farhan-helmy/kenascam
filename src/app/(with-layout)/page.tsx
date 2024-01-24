'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import ScamCard from '@/containers/home-page/ScamCard';

export default function HomePage() {
  const [, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  return (
    <div className="flex items-center justify-center px-8 pt-4 sm:px-12 md:px-24 xl:px-52">
      <div className="grid gap-4 md:grid-cols-3">
        <Link href="/scam/123" passHref>
          <ScamCard />
        </Link>
        <ScamCard />
        <ScamCard />
        <ScamCard />
        <ScamCard />
        <ScamCard />
        <ScamCard />
      </div>
    </div>
  );
}
