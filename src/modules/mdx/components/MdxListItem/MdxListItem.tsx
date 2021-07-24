import tw, { styled } from 'twin.macro';

const MdxListItem = styled.li`
  &::marker {
    ${tw`text-textmuted block mr-lg`}
  }

  & p {
    ${tw`mt-0`}
  }
`;

export default MdxListItem;
