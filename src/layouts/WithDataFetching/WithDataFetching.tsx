import { getErrorMessage } from '@modules/api/api-utils';
import { PropsWithChildren, ReactNode } from 'react';
type Props<Data> = {
  error: unknown;
  data: Data | undefined | null;
  children(data: Data): ReactNode;
};
function WithDataFetching<Data>({
  data,
  error,
  children,
}: PropsWithChildren<Props<Data>>) {
  if (error)
    return <h1 tw="text-primarymuted">Error {getErrorMessage(error)}</h1>;
  if (!data) return <h1>Loading</h1>;

  return <>{children(data)}</>;
}

export default WithDataFetching;
