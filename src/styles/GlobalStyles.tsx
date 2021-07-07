import { createGlobalStyle } from 'styled-components';
import tw, { GlobalStyles as BaseStyles, theme } from 'twin.macro';

const CustomStyles = createGlobalStyle`
  html, body, #__next {
    ${tw`h-full`}
  }

  #__next {
    ${tw`flex flex-col`}
  }

  body {
    -webkit-tap-highlight-color: ${theme`colors.primary`};
    ${tw`antialiased`}    
  }
`;

const GlobalStyles = () => (
  <>
    <BaseStyles />
    <CustomStyles />
  </>
);

export default GlobalStyles;
