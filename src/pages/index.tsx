import DefaultLayout from '@layouts/DefaultLayout/DefaultLayout';
import { AppProps } from 'next/dist/next-server/lib/router/router';
import { FC } from 'react';

export default function Home() {
  return (
    <>
      <main tw="">
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsum eum
          rerum aut incidunt quas. Dignissimos numquam quos, adipisci sit
          voluptates officia eveniet, odio magnam eos ex doloribus natus autem
          aperiam in provident ut tempore illum optio dicta. Ducimus a quam
          laudantium porro illum, odio quasi, blanditiis dolorum fuga laboriosam
          distinctio!
        </p>

        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsum eum
          rerum aut incidunt quas. Dignissimos numquam quos, adipisci sit
          voluptates officia eveniet, odio magnam eos ex doloribus natus autem
          aperiam in provident ut tempore illum optio dicta. Ducimus a quam
          laudantium porro illum, odio quasi, blanditiis dolorum fuga laboriosam
          distinctio!
        </p>

        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsum eum
          rerum aut incidunt quas. Dignissimos numquam quos, adipisci sit
          voluptates officia eveniet, odio magnam eos ex doloribus natus autem
          aperiam in provident ut tempore illum optio dicta. Ducimus a quam
          laudantium porro illum, odio quasi, blanditiis dolorum fuga laboriosam
          distinctio!
        </p>

        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsum eum
          rerum aut incidunt quas. Dignissimos numquam quos, adipisci sit
          voluptates officia eveniet, odio magnam eos ex doloribus natus autem
          aperiam in provident ut tempore illum optio dicta. Ducimus a quam
          laudantium porro illum, odio quasi, blanditiis dolorum fuga laboriosam
          distinctio!
        </p>

        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsum eum
          rerum aut incidunt quas. Dignissimos numquam quos, adipisci sit
          voluptates officia eveniet, odio magnam eos ex doloribus natus autem
          aperiam in provident ut tempore illum optio dicta. Ducimus a quam
          laudantium porro illum, odio quasi, blanditiis dolorum fuga laboriosam
          distinctio!
        </p>

        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsum eum
          rerum aut incidunt quas. Dignissimos numquam quos, adipisci sit
          voluptates officia eveniet, odio magnam eos ex doloribus natus autem
          aperiam in provident ut tempore illum optio dicta. Ducimus a quam
          laudantium porro illum, odio quasi, blanditiis dolorum fuga laboriosam
          distinctio!
        </p>

        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsum eum
          rerum aut incidunt quas. Dignissimos numquam quos, adipisci sit
          voluptates officia eveniet, odio magnam eos ex doloribus natus autem
          aperiam in provident ut tempore illum optio dicta. Ducimus a quam
          laudantium porro illum, odio quasi, blanditiis dolorum fuga laboriosam
          distinctio!
        </p>

        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsum eum
          rerum aut incidunt quas. Dignissimos numquam quos, adipisci sit
          voluptates officia eveniet, odio magnam eos ex doloribus natus autem
          aperiam in provident ut tempore illum optio dicta. Ducimus a quam
          laudantium porro illum, odio quasi, blanditiis dolorum fuga laboriosam
          distinctio!
        </p>

        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsum eum
          rerum aut incidunt quas. Dignissimos numquam quos, adipisci sit
          voluptates officia eveniet, odio magnam eos ex doloribus natus autem
          aperiam in provident ut tempore illum optio dicta. Ducimus a quam
          laudantium porro illum, odio quasi, blanditiis dolorum fuga laboriosam
          distinctio!
        </p>

        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsum eum
          rerum aut incidunt quas. Dignissimos numquam quos, adipisci sit
          voluptates officia eveniet, odio magnam eos ex doloribus natus autem
          aperiam in provident ut tempore illum optio dicta. Ducimus a quam
          laudantium porro illum, odio quasi, blanditiis dolorum fuga laboriosam
          distinctio!
        </p>

        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsum eum
          rerum aut incidunt quas. Dignissimos numquam quos, adipisci sit
          voluptates officia eveniet, odio magnam eos ex doloribus natus autem
          aperiam in provident ut tempore illum optio dicta. Ducimus a quam
          laudantium porro illum, odio quasi, blanditiis dolorum fuga laboriosam
          distinctio!
        </p>
      </main>
    </>
  );
}

Home.WithLayout = ((page: AppProps['Component']) => (
  <DefaultLayout>{page}</DefaultLayout>
)) as FC;
