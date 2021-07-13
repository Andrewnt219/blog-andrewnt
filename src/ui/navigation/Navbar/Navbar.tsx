import ColorThemeButton from '@ui/ColorThemeButton/ColorThemeButton';
import LogoText from '@ui/LogoText/LogoText';

type Props = {
  className?: string;
};
const Navbar = ({ className }: Props) => {
  return (
    <header className={className}>
      <LogoText tw="text-xl" />

      <nav></nav>

      <ColorThemeButton />
    </header>
  );
};

export default Navbar;
