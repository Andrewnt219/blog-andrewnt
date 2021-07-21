import tw, { css } from 'twin.macro';

export const markdownStyle = css`
  .heading-anchor {
    ${tw``}

    &::after {
      content: '#';
      ${tw`invisible ml-sm text-textmuted`}
    }

    &:hover ::after {
      ${tw`visible`}
    }
  }
`;
