import Image, { ImageProps } from 'next/image';
import tw, { styled } from 'twin.macro';

type Props = ImageProps &
  Pick<StyledWraperProps, 'isRestrained'> & {
    className?: string;
    alt: string;
  };
function MdxImage({ className, isRestrained, ...props }: Props) {
  const { alt } = props;

  return (
    <StyledWrapper isRestrained={isRestrained} className={className}>
      <Image {...props} alt={alt} />
    </StyledWrapper>
  );
}

type StyledWraperProps = {
  isRestrained?: boolean;
};

const StyledWrapper = styled.div<StyledWraperProps>`
  ${tw`mt-md md:mt-xl w-full`}

  & img {
    ${tw`rounded (border border-solid border-bordercolor)! `}
  }

  ${(p) => !p.isRestrained && tw`col-span-full!`}
`;

export default MdxImage;
