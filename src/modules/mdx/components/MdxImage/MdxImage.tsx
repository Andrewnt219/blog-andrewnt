import Image, { ImageProps } from 'next/image';

type Props = ImageProps & {
  className?: string;
  alt: string;
};
function MdxImage({ className, ...props }: Props) {
  const { alt } = props;
  return (
    <div className={className} tw="mt-md md:mt-lg">
      <Image {...props} alt={alt} />
    </div>
  );
}

export default MdxImage;
