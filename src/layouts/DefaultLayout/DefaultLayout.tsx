import Footer from '@ui/navigation/Footer/Footer';
import Navbar from '@ui/navigation/Navbar/Navbar';
import React, { PropsWithChildren } from 'react';

type Props = {
  className?: string;
};
function DefaultLayout({ className, children }: PropsWithChildren<Props>) {
  return (
    <>
      <Navbar />

      <main className={className} tw="flex-1 mt-lg max-w-prose mx-auto">
        {children}
      </main>

      <Footer />
    </>
  );
}

export default DefaultLayout;
