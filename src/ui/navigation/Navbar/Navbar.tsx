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
      tw=" py-sm bg-bgmuted bg-opacity-60 sticky top-0 backdrop-filter backdrop-blur-lg backdrop-saturate-[180%]"
    >
      <div tw="flex items-center gap-lg max-w-7xl mx-auto">
        <Logo tw="w-14 h-14" />

        <LogoText tw="w-48" />

        <nav tw="ml-auto">
          <ul tw="flex">
            <li>
              <ButtonLink href="https://andrewnt.dev/">Portfolio</ButtonLink>
            </li>
          </ul>
        </nav>

        <ColorThemeButton />
      </div>
    </header>
  );
};

export default Navbar;
