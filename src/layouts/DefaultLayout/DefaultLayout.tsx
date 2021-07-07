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
      <main className={className}>{children}</main>
      <Footer />
    </>
  );
}

export default DefaultLayout;
