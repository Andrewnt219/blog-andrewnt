import tw, { css, styled } from 'twin.macro';

const commonStyles = css`
  ${tw`space-y-sm mt-md ml-md pl-md  md:(pl-xl mt-xl)`}

  /* Prevent all lists in table of content from indenting */
  #table-of-contents + &,
  #table-of-contents + & & {
    ${tw`pl-0!`}
  }
`;

export const MdxUnorderedList = styled.ul`
  ${commonStyles}
  ${tw`list-disc`}
`;

export const MdxOrderedList = styled.ol`
  ${commonStyles}
  ${tw`list-decimal`}
`;
