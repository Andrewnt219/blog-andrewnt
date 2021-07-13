import DefaultLayout from '@layouts/DefaultLayout/DefaultLayout';
import { AppProps } from 'next/dist/next-server/lib/router/router';
import { FC } from 'react';

export default function Home() {
  return (
    <>
      <main>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus magni
          nisi enim earum ratione sapiente fuga recusandae porro illum vitae.
        </p>
        <p>
          Lorem ipsum Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Ipsa, molestiae culpa quo quaerat corporis expedita saepe rem placeat
          accusantium animi numquam, illum odio modi iure tempore quod autem
          perferendis consectetur adipisci aliquid? Rerum quam voluptatem libero
          dolor aspernatur aperiam dolorum! Magnam blanditiis amet quos officia.
          Nobis distinctio ipsam odio suscipit.
          <span tw="text-textmuted">
            dolor sit amet consectetur adipisicing elit
          </span>
          . Blanditiis nulla ullam corrupti dolorem quae ipsa rem voluptates
          totam neque aspernatur. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Temporibus nisi architecto iste blanditiis quidem
          sed deleniti quos in quisquam. Eaque sequi error fugiat laboriosam
          voluptatibus?
        </p>

        <a tw="font-medium text-primary underline cursor-pointer hover:text-primarymuted">
          Hello
        </a>

        <button
          tw="ml-xl p-sm bg-bgmuted text-textcolor font-medium"
          onClick={() => document.body.classList.toggle('dark')}
        >
          Toggle
        </button>

        <div tw="flex flex-col items-center gap-lg border m-xl p-xl rounded">
          <button tw="p-sm rounded bg-bgmuted ">
            <span tw="text-primary">Bg Muted - Text Primary</span>
          </button>
          <button tw="p-sm rounded bg-bgmuted ">
            <span tw="text-primarymuted">Bg Muted - Text Primary Muted</span>
          </button>
          <button tw="p-sm rounded bg-bgcolor">
            <span tw="text-primarymuted">Bg default- Text Primary Muted</span>
          </button>
          <button tw="p-sm rounded bg-bgcolor ">
            <span tw="text-primary">Bg default- Text Primary</span>
          </button>
          <button tw="p-sm rounded bg-bgcolor ">
            <span tw="text-textcolor">Bg default- Text default</span>
          </button>
          <button tw="p-sm rounded bg-bgcolor ">
            <span tw="text-textmuted">Bg default- Text muted</span>
          </button>
          <button tw="p-sm rounded bg-bgmuted ">
            <span tw="text-textcolor">Bg muted- Text default</span>
          </button>
          <button tw="p-sm rounded bg-bgmuted ">
            <span tw="text-textmuted">Bg muted- Text muted</span>
          </button>
        </div>
      </main>
    </>
  );
}

Home.WithLayout = ((page: AppProps['Component']) => (
  <DefaultLayout>{page}</DefaultLayout>
)) as FC;
