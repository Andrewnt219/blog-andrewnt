import tw, { css } from 'twin.macro';

export const markdownStyle = css`
  :not(pre) > code {
    ${tw`bg-bgmuted px-xs rounded border`}
  }

  pre {
    ${tw`border`}
  }

  .heading-anchor {
    ${tw``}

    &::after {
      content: '#';
      ${tw`invisible ml-sm text-textmuted`}

      *:hover > & {
        ${tw`visible`}
      }
    }
  }
`;
