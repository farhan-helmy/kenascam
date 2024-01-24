import { DiscordLogoIcon, GitHubLogoIcon } from '@radix-ui/react-icons';
import type { ReactNode } from 'react';
import Link from 'next/link';
import { bungee } from '@/app/fonts';

type Props = {
  createScam: ReactNode;
};

export default function Navbar(props: Readonly<Props>) {
  const { createScam } = props;

  return (
    <div className="sticky top-0 flex w-full justify-between p-4">
      <div className="flex flex-row items-center justify-center">
        <Link className={`pr-4 md:text-2xl ${bungee.className}`} href="/">
          Kena Scam
        </Link>
        <GitHubLogoIcon className="mr-4 h-6 w-6" />
        <DiscordLogoIcon className="h-6 w-6" />
      </div>
      {createScam}
    </div>
  );
}
