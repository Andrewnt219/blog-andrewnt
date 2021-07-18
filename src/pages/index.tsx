import { WithDefaultLayout } from '@layouts/DefaultLayout/DefaultLayout';

export default function Home() {
  return (
    <>
      <h1 tw="font-black text-hero">Latest</h1>
      <p>Lorem ipsum dolor sit amet.</p>
    </>
  );
}

Home.WithLayout = WithDefaultLayout;
