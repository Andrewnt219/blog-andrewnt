import DefaultLayout from '@layouts/DefaultLayout/DefaultLayout';
import { AppProps } from 'next/dist/next-server/lib/router/router';
import { FC } from 'react';

export default function Home() {
  return (
    <>
      <main tw="">
        <button onClick={() => document.body.classList.toggle('dark')}>
          Toggle
        </button>

        <h1 tw="mt-10 text-primary text-opacity-50 text-9xl font-black bg-primary bg-opacity-10">
          Hi
        </h1>

        <h1 tw="text-primary text-opacity-10 text-9xl font-black bg-primary bg-opacity-50">
          Hello
        </h1>

        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi culpa
          beatae, sed soluta eius quos ratione vel dolore quia illo.
        </p>
        <a>Hello</a>
      </main>
    </>
  );
}

Home.WithLayout = ((page: AppProps['Component']) => (
  <DefaultLayout>{page}</DefaultLayout>
)) as FC;
