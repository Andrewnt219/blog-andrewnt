import { createGlobalStyle } from 'styled-components';
import tw, { GlobalStyles as BaseStyles, theme } from 'twin.macro';
import { markdownStyle } from './_markdownStyle';
import { prismStyle } from './_prismStyle';

const CustomStyles = createGlobalStyle`
  :root {    
    --primary: 224, 76%, 48%;    
    --primary-muted: 224, 64%, 33%;

    --text-color: 217, 19%, 27%;
    --text-muted: 214, 6%, 47%;
    
    --bg-color: 0, 0%, 100%;
    --bg-muted: 220, 13%, 91%;
    --bg-gray: 223, 30%, 95%;
    --bg-light: 213, 23%, 91%;

    --border-color: 220, 13%, 91%;
  } 

  html, body{
    ${tw`h-full text-body`}
  }

  body {
    -webkit-tap-highlight-color: ${theme`colors.primary`};

    &.dark {
      --primary: 213, 97%, 87%;
      --primary-muted: 217, 91%, 60%;
      
      --text-color: 216, 12%, 84%;
      --text-muted: 218, 11%, 65%;
      
      --bg-color: 221, 39%, 11%;
      --bg-muted: 215, 14%, 34%;
      --bg-gray: 217, 47%, 14%;    
      --bg-light: 217, 33%, 20%;


      --border-color: 217, 19%, 27%;

      & img {
        ${tw`filter brightness-95`}
      }
    }
  }


  #__next {
    ${tw`min-h-full flex flex-col antialiased text-textcolor bg-bgcolor`}
  }


  ${prismStyle}
  ${markdownStyle}
`;

const GlobalStyles = () => (
  <>
    <BaseStyles />
    <CustomStyles />
  </>
);

export default GlobalStyles;
