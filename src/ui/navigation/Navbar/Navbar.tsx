import { ButtonLink } from '@ui/Button/Button';
import ColorThemeButton from '@ui/ColorThemeButton/ColorThemeButton';
import Logo from '@ui/Logo/Logo';
import LogoText from '@ui/LogoText/LogoText';

type Props = {
  className?: string;
};
const Navbar = ({ className }: Props) => {
  return (
    <header
      className={className}
      tw="py-lg bg-bgcolor bg-opacity-60 sticky top-0 backdrop-filter backdrop-blur-lg backdrop-saturate-[180%]"
    >
      <div tw="flex items-center gap-lg max-w-7xl mx-auto">
        <Logo tw="w-12 md:w-14" />

        <LogoText tw="hidden md:(inline-block w-48)" />

        <nav tw="ml-auto">
          <ul tw="flex">
            <li>
              <ButtonLink
                target="_blank"
                rel="noreferrer noopener"
                href="https://andrewnt.dev/"
              >
                Portfolio
              </ButtonLink>
            </li>
          </ul>
        </nav>

        <ColorThemeButton />
      </div>
    </header>
  );
};

export default Navbar;
