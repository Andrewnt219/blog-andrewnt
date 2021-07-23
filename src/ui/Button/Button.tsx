import tw, { styled } from 'twin.macro';

const commonStyle = tw`font-medium rounded outline-none! focus-visible:(ring-2 ring-textcolor) active:(ring-2 ring-textcolor)`;

type Size = 'sm' | 'md' | 'lg' | 'even';
const sizeStyle = (size: Size | undefined) => {
  switch (size) {
    case 'lg':
      return tw`py-md px-xl md:(px-2xl)`;

    case 'md':
      return tw`py-sm px-sm md:(px-md)`;

    case 'sm':
      return tw`py-xs px-sm`;

    default:
      return tw``;
  }
};

type Variant = 'contained' | 'outline' | 'text';
const variantsStyle = (variant: Variant | undefined) => {
  switch (variant) {
    case 'contained':
      return tw`shadow-sm bg-bggray border text-textcolor  transition-colors hover:bg-bglight `;

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

type ButtonPrimaryProps = {
  size?: Size;
};
export const ButtonPrimary = styled.button<ButtonPrimaryProps>`
  ${commonStyle}
  ${(p) => sizeStyle(p.size)}
  ${tw`bg-primary text-bgcolor hover:bg-primarymuted`}
`;
