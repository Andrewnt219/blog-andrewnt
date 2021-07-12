import { createGlobalStyle } from 'styled-components';
import tw, { GlobalStyles as BaseStyles, theme } from 'twin.macro';

const CustomStyles = createGlobalStyle`
  :root {
    --primary: 221, 83%, 53%;
    --text-color: 221, 39%, 11%;
    --bg-color: 0, 0%, 100%;
  } 

  html, body, #__next {
    ${tw`h-full`}
  }

  body {
    -webkit-tap-highlight-color: ${theme`colors.primary`};

    &.dark {
      --primary: 217, 91%, 60%;
      --text-color: 220, 14%, 96%;
      --bg-color: 221, 39%, 11%;
    }
  }

  #__next {
    ${tw`flex flex-col antialiased text-textcolor bg-bgcolor`}
  }
`;

const GlobalStyles = () => (
  <>
    <BaseStyles />
    <CustomStyles />
  </>
);

export default GlobalStyles;
