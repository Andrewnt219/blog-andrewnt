import DefaultLayout from '@layouts/DefaultLayout/DefaultLayout';
import { AppProps } from 'next/app';
import { FC } from 'react';

type Props = {
  className?: string;
};
function NotFound({ className }: Props) {
  return (
    <div className={className}>
      <h1>Page not found</h1>
    </div>
  );
}

NotFound.WithLayout = ((page: AppProps['Component']) => (
  <DefaultLayout>{page}</DefaultLayout>
)) as FC;

export default NotFound;
