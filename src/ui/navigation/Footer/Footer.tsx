import { ButtonLink } from '@ui/Button/Button';

type Props = {
  className?: string;
};
function Footer({ className }: Props) {
  return (
    <footer className={className} tw="border-t px-sm md:px-md">
      <div tw="mx-auto pt-2xl pb-3xl flex flex-col gap-2xl md:(flex-row gap-4xl)">
        <div>
          <h3 tw="font-bold">Andrew Nguyen</h3>
          <ButtonLink
            href="mailto:hey@andrewnt.dev"
            target="_blank"
            rel="noopener"
          >
            hey@andrewnt.dev
          </ButtonLink>
        </div>

        <nav aria-label="Links to my other social media">
          <h3 tw="font-bold">Find me on the internet</h3>
          <ul tw="flex gap-md flex-wrap">
            {mediaLinks.map((link) => (
              <li key={link.href}>
                <ButtonLink href={link.href} target="_blank" rel="noopener">
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
    href: 'https://www.linkedin.com/in/andrewnt219/',
    label: 'LinkedIn',
  },
  {
    href: 'https://twitter.com/andrewnt219',
    label: 'Twiiter',
  },
  {
    href: 'https://www.facebook.com/phong.nguyentuan.108',
    label: 'Facebook',
  },
  {
    href: 'https://www.buymeacoffee.com/andrewnt219',
    label: 'Buy me a coffee',
  },
];
export default Footer;
