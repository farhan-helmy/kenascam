import type { ReactNode } from 'react';
import Navbar from '@/components/Navbar';

type Props = {
  children: ReactNode;
  createScam: ReactNode;
};

export default function Layout(props: Readonly<Props>) {
  const { children, createScam } = props;

  return (
    <>
      <Navbar createScam={createScam} />
      {children}
    </>
  );
}
