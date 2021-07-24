import { GetLayout } from '$common';
import { ColorThemeProvider } from '@modules/color-theme/ColorThemeContext';
import GlobalStyles from '@styles/GlobalStyles';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

const queryClient = new QueryClient();

type Page = AppProps['Component'] & {
  getLayout?: GetLayout;
};
function MyApp({ Component, pageProps }: AppProps) {
  const getLayout = (Component as Page).getLayout ?? ((page) => page);

  return (
    <QueryClientProvider client={queryClient}>
      <ColorThemeProvider>
        <GlobalStyles />
        {getLayout(<Component {...pageProps} />)}
      </ColorThemeProvider>

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
export default MyApp;
