import tw, { css } from 'twin.macro';

export const markdownStyle = css`
  .heading-anchor {
    ${tw`inline-flex`}

    &::after {
      content: '#';
      ${tw`invisible block ml-sm text-textmuted`}
    }

    &:hover ::after {
      ${tw`visible`}
    }
  }
`;
