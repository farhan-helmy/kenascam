import { PlusCircledIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { Button } from '@/components/ui/button';

type Props = {
  children: ReactNode;
};

export default function Layout(props: Readonly<Props>) {
  const { children } = props;

  return (
    <>
      <Button asChild>
        <Link href="/scams/create">
          <PlusCircledIcon className="mr-2" />
          Scam
        </Link>
      </Button>
      {children}
    </>
  );
}
