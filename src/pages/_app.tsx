import '@styles/globals.css';
import type { AppProps } from 'next/app';
import { ReactNode } from 'react';

type Page = AppProps['Component'] & {
  WithLayout?(page: ReactNode): ReactNode;
};
function MyApp({ Component, pageProps }: AppProps) {
  const WithLayout = (Component as Page).WithLayout ?? ((page: Page) => page);

  return <>{WithLayout(<Component {...pageProps} />)}</>;
}
export default MyApp;
