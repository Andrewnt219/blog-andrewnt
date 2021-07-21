import { ImSpinner3 } from 'react-icons/im';
import tw, { styled } from 'twin.macro';

type Props = {
  isLoading: boolean | null;
};
const LoadingIndicator = styled(ImSpinner3)<Props>`
  ${tw` w-[1.5em] h-[1.5em]`}
  ${(p) => (p.isLoading === false ? tw`invisible animate-spin` : tw`visible`)}
`;

export default LoadingIndicator;
