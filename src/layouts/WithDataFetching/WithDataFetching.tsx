import { getErrorMessage } from '@modules/api/api-utils';
import LoadingIndicator from '@ui/LoadingIndicator/LoadingIndicator';
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
  if (!data)
    return (
      <div tw="fixed bottom-sm right-sm bg-bgmuted p-sm md:text-xl rounded">
        <LoadingIndicator isLoading={null} />
      </div>
    );

  return <>{children(data)}</>;
}

export default WithDataFetching;
