import DefaultLayout from '@layouts/DefaultLayout/DefaultLayout';
import { AppProps } from 'next/dist/next-server/lib/router/router';
import { FC } from 'react';

export default function Home() {
  return (
    <>
      <h1>Hello world</h1>
    </>
  );
}

Home.WithLayout = ((page: AppProps['Component']) => (
  <DefaultLayout>{page}</DefaultLayout>
)) as FC;
