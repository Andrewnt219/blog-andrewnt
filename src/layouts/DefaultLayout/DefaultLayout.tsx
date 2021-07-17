import Footer from '@ui/navigation/Footer/Footer';
import Navbar from '@ui/navigation/Navbar/Navbar';
import React, { PropsWithChildren } from 'react';

type Props = {
  className?: string;
};
function DefaultLayout({ className, children }: PropsWithChildren<Props>) {
  return (
    <>
      <Navbar tw="px-2xl" />

      <main
        className={className}
        tw="flex-1 mt-2xl mb-4xl max-w-4xl mx-auto px-2xl"
      >
        {children}
      </main>

      <Footer tw="all-child:(max-w-4xl px-2xl)" />
    </>
  );
}

export default DefaultLayout;
