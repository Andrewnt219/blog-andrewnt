import { ButtonLink } from '@ui/Button/Button';
import NextLink from 'next/link';
import { PropsWithChildren } from 'react';

type Props = {
  href: string;
};
const CustomLink = ({ children, ...props }: PropsWithChildren<Props>) => {
  const href = props.href;
  const isInternalLink = href && (href.startsWith('/') || href.startsWith('#'));

  if (isInternalLink) {
    return (
      <NextLink href={href} passHref>
        <ButtonLink {...props}>{children}</ButtonLink>
      </NextLink>
    );
  }

  return (
    <ButtonLink target="_blank" rel="noopener noreferrer" {...props}>
      {children}
    </ButtonLink>
  );
};

export default CustomLink;
