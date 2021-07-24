import { useColorThemeContext } from '@modules/color-theme/ColorThemeContext';
import { Button } from '@ui/Button/Button';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import { RiMoonClearFill, RiSunFill } from 'react-icons/ri';
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
      tw="text-lg overflow-hidden"
      aria-label={`Current theme is ${theme}`}
      size="md"
      variant="contained"
      className={className}
      onClick={handleButtonClick}
    >
      <AnimatePresence exitBeforeEnter>
        {theme === 'light' && <SunIcon />}
        {theme === 'dark' && <MoonIcon />}
      </AnimatePresence>
    </Button>
  );
};

function SunIcon() {
  return (
    <motion.span
      tw="block"
      key="sun"
      variants={svgVariants}
      animate="visible"
      initial="hidden"
      exit="hidden"
    >
      <span tw="sr-only">Current: light theme. Switch to dark theme.</span>
      <RiSunFill />
    </motion.span>
  );
}

function MoonIcon() {
  return (
    <motion.span
      tw="block"
      key="moon"
      variants={svgVariants}
      animate="visible"
      initial="hidden"
      exit="hidden"
    >
      <span tw="sr-only">Current: dark theme. Switch to light theme.</span>
      <RiMoonClearFill />
    </motion.span>
  );
}

const svgVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
    },
  },
};

export default ColorThemeButton;
