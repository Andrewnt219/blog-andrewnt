import DefaultLayout from '@layouts/DefaultLayout/DefaultLayout';
import { ReactNode } from 'react';

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

NotFound.getLayout = (page: ReactNode) => <DefaultLayout>{page}</DefaultLayout>;

export default NotFound;
