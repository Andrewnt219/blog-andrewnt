import { WithLayout } from '$common';
import { ColorThemeProvider } from '@modules/color-theme/ColorThemeContext';
import GlobalStyles from '@styles/GlobalStyles';
import type { AppProps } from 'next/app';

type Page = AppProps['Component'] & {
  WithLayout?: WithLayout;
};
function MyApp({ Component, pageProps }: AppProps) {
  const WithLayout = (Component as Page).WithLayout ?? ((page) => page);

  return (
    <ColorThemeProvider>
      <GlobalStyles />
      {WithLayout(<Component {...pageProps} />)}
    </ColorThemeProvider>
  );
}
export default MyApp;
