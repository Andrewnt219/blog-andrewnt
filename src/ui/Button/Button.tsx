import tw, { styled } from 'twin.macro';

const commonStyle = tw`border border-transparent font-medium rounded outline-none! focus-visible:(ring-2 ring-textcolor) active:(ring-2 ring-textcolor)`;

type Size = 'sm' | 'md' | 'lg';
const sizeStyle = (size: Size | undefined) => {
  switch (size) {
    case 'lg':
      return tw`px-lg py-md`;

    case 'md':
      return tw`px-md py-sm`;

    case 'sm':
      return tw`px-sm py-xs`;

    default:
      return tw``;
  }
};

type Variant = 'contained' | 'outline' | 'text';
const variantsStyle = (variant: Variant | undefined) => {
  switch (variant) {
    case 'contained':
      return tw`bg-bgmuted text-textcolor border-transparent transition-colors hover:bg-opacity-70 `;

    case 'outline':
      return tw`bg-transparent border-bordercolor`;

    case 'text':
      return tw`text-primary hover:text-primarymuted transition-colors`;

    default:
      return tw``;
  }
};

/* -------------------------------------------------------------------------- */
/*                                 BASE BUTTON                                */
/* -------------------------------------------------------------------------- */
type Props = {
  size?: Size;
  variant?: Variant;
};
export const Button = styled.button<Props>`
  ${commonStyle}

  ${(p) => sizeStyle(p.size)}
  ${(p) => variantsStyle(p.variant)}
`;

type ButtonLinkProps = {
  size?: Size;
};
export const ButtonLink = styled.a<ButtonLinkProps>`
  ${commonStyle}
  ${variantsStyle('text')}
  ${(p) => sizeStyle(p.size)}
`;
