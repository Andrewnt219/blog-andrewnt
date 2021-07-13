import { useColorThemeContext } from '@modules/color-theme/ColorThemeContext';
import { Button } from '@ui/Button/Button';
type Props = {
  className?: string;
};
const ColorThemeButton = ({ className }: Props) => {
  const { switchTheme, theme } = useColorThemeContext();

  const handleButtonClick = () => {
    switch (theme) {
      case 'os':
      case 'dark':
        switchTheme('light');
        return;

      case 'light':
        switchTheme('dark');
        return;

      default:
        throw new Error('Invalid theme config');
    }
  };

  return (
    <Button
      variant="contained"
      size="lg"
      className={className}
      tw=""
      onClick={handleButtonClick}
    >
      {theme}
    </Button>
  );
};

export default ColorThemeButton;
