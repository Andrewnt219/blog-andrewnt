import ColorThemeButton from '@ui/ColorThemeButton/ColorThemeButton';
import Logo from '@ui/Logo/Logo';
import LogoText from '@ui/LogoText/LogoText';
import { FaSun } from 'react-icons/fa';
type Props = {
  className?: string;
};
const Navbar = ({ className }: Props) => {
  return (
    <header className={className}>
      <LogoText tw="text-xl" />

      <Logo tw="h-20 w-20" />

      <nav></nav>

      <ColorThemeButton />
      <FaSun />
    </header>
  );
};

export default Navbar;
