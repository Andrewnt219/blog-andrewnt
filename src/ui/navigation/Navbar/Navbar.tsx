import ColorThemeButton from '@ui/ColorThemeButton/ColorThemeButton';

type Props = {
  className?: string;
};
const Navbar = ({ className }: Props) => {
  return (
    <header className={className}>
      <nav></nav>

      <ColorThemeButton />
    </header>
  );
};

export default Navbar;
