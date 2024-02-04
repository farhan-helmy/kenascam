import { useState } from 'react';
import { bungee } from '@/app/fonts';
import { GitHubLogoIcon, DiscordLogoIcon } from '@radix-ui/react-icons';
import { DeleteFile } from '@/lib/server/s3';

type HeaderProps = {
  children?: React.ReactNode;
};

const Header = ({ children }: HeaderProps) => {
  return (
    <div className="sticky top-0 flex w-full justify-between p-4">
      <div className="flex flex-row items-center justify-center">
        <button className={`pr-4 md:text-2xl ${bungee.className}`}>Kena Scam</button>
        <GitHubLogoIcon className="mr-4 h-6 w-6" />
        <DiscordLogoIcon className="h-6 w-6" />
      </div>
      {children && <div>{children}</div>}
    </div>
  );
};

export default Header;
