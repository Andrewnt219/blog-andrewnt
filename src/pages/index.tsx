import DefaultLayout from '@layouts/DefaultLayout/DefaultLayout';
import { AppProps } from 'next/dist/next-server/lib/router/router';
import { FC } from 'react';

export default function Home() {
  return (
    <>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Adipisci animi
        quidem, numquam excepturi unde velit ea pariatur! Debitis, sint aliquid.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo rerum optio
        voluptas molestias ratione placeat odio. In asperiores laudantium
        eveniet.
        <span tw="text-[#2563EB]">Read more</span>
      </p>

      <p tw="bg-black text-white">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Adipisci animi
        quidem, numquam excepturi unde velit ea pariatur! Debitis, sint aliquid.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo rerum optio
        voluptas molestias ratione placeat odio. In asperiores laudantium
        eveniet.
        <span tw="text-[#3B82F6]">Read more</span>
      </p>
    </>
  );
}

Home.WithLayout = ((page: AppProps['Component']) => (
  <DefaultLayout>{page}</DefaultLayout>
)) as FC;
