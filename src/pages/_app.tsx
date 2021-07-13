import { ColorThemeProvider } from '@modules/color-theme/ColorThemeContext';
import GlobalStyles from '@styles/GlobalStyles';
import type { AppProps } from 'next/app';
import { ReactNode } from 'react';

type Page = AppProps['Component'] & {
  WithLayout?(page: ReactNode): ReactNode;
};
function MyApp({ Component, pageProps }: AppProps) {
  const WithLayout = (Component as Page).WithLayout ?? ((page: Page) => page);

  return (
    <ColorThemeProvider>
      <GlobalStyles />
      {WithLayout(<Component {...pageProps} />)}
    </ColorThemeProvider>
  );
}
export default MyApp;
