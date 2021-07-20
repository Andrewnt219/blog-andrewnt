import { WithLayout } from '$common';
import { ColorThemeProvider } from '@modules/color-theme/ColorThemeContext';
import GlobalStyles from '@styles/GlobalStyles';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

const queryClient = new QueryClient();

type Page = AppProps['Component'] & {
  WithLayout?: WithLayout;
};
function MyApp({ Component, pageProps }: AppProps) {
  const WithLayout = (Component as Page).WithLayout ?? ((page) => page);

  return (
    <QueryClientProvider client={queryClient}>
      <ColorThemeProvider>
        <GlobalStyles />
        {WithLayout(<Component {...pageProps} />)}
      </ColorThemeProvider>

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
export default MyApp;
