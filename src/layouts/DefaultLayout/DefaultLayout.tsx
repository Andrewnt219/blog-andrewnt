import { WithLayout } from '$common';
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

      {/* w-full so main is left aligned even without content */}
      <main
        className={className}
        tw="flex-1 w-full mt-2xl mb-4xl max-w-5xl mx-auto px-2xl"
      >
        {children}
      </main>

      <Footer tw="all-child:(max-w-5xl px-2xl)" />
    </>
  );
}

export const WithDefaultLayout: WithLayout = (page) => (
  <DefaultLayout>{page}</DefaultLayout>
);

export default DefaultLayout;
