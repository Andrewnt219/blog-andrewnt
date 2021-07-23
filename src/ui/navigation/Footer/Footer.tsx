import { ButtonLink } from '@ui/Button/Button';

type Props = {
  className?: string;
};
function Footer({ className }: Props) {
  return (
    <footer className={className} tw="mb-3xl px-sm md:px-md">
      <div tw="border-t mx-auto pt-2xl pb-3xl">
        <nav aria-label="Links to my other social media">
          <ul tw="grid grid-cols-2 md:grid-cols-3">
            {mediaLinks.map((link) => (
              <li key={link.href}>
                <ButtonLink href={link.href} target="_blank" rel="noreferrer">
                  {link.label}
                </ButtonLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}

type Link = {
  href: string;
  label: string;
};
const mediaLinks: Link[] = [
  {
    href: 'https://andrewnt.dev/',
    label: 'Portfolio',
  },
  {
    href: 'https://github.com/Andrewnt219',
    label: 'Github',
  },
  {
    href: 'https://www.facebook.com/phong.nguyentuan.108',
    label: 'Facebook',
  },
  {
    href: 'https://www.linkedin.com/in/andrewnt219/',
    label: 'LinkedIn',
  },
  {
    href: 'https://twitter.com/andrewnt219',
    label: 'Twiiter',
  },
];
export default Footer;
