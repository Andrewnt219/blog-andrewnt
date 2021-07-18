import { WithDefaultLayout } from '@layouts/DefaultLayout/DefaultLayout';

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

NotFound.WithLayout = WithDefaultLayout;

export default NotFound;
