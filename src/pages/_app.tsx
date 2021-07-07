import GlobalStyles from '@styles/GlobalStyles';
import type { AppProps } from 'next/app';
import { ReactNode } from 'react';

type Page = AppProps['Component'] & {
  WithLayout?(page: ReactNode): ReactNode;
};
function MyApp({ Component, pageProps }: AppProps) {
  const WithLayout = (Component as Page).WithLayout ?? ((page: Page) => page);

  return (
    <>
      <GlobalStyles />
      {WithLayout(<Component {...pageProps} />)}
    </>
  );
}
export default MyApp;
