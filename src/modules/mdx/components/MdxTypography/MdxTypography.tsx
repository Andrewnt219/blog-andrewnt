import tw, { styled } from 'twin.macro';

type Variant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'pre';
function getVariantStyle(variant: Variant = 'p') {
  switch (variant) {
    case 'h1':
      return tw``;

    case 'h2':
      return tw`text-h2 pb-xs border-b mt-xl md:mt-3xl font-bold`;

    case 'h3':
      return tw`text-h3 font-bold mt-xl md:mt-2xl`;

    case 'h4':
      return tw`text-lg font-bold`;

    case 'h5':
      return tw`font-bold`;

    case 'h6':
      return tw`font-bold `;

    case 'p':
    case 'pre':
    default:
      return tw``;
  }
}

type MdxTypographyProps = {
  variant?: Variant;
  as?: Variant;
};
export const MdxTypography = styled.p.attrs((p: MdxTypographyProps) => ({
  as: p.as ?? p.variant ?? 'p',
}))<MdxTypographyProps>`
  ${tw`leading-relaxed mt-md md:mt-xl`}
  scroll-margin-top: 6rem;
  ${(p) => getVariantStyle(p.variant)};
`;
