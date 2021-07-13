import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  ColorTheme,
  COLOR_THEME_LOCAL_STORAGE_KEY,
  isColorTheme,
} from './color-theme-constant';

/* --------------------------------- CONTEXT -------------------------------- */
type Context = {
  theme: ColorTheme;
  switchTheme(theme: ColorTheme): void;
};
const DarkModeContext = createContext<Context | undefined>(undefined);

/* -------------------------------- PROVIDER -------------------------------- */

type ProviderProps = {
  children: ReactNode | ReactNode[];
};
const ColorThemeProvider = ({ children }: ProviderProps) => {
  const [theme, setTheme] = useState<ColorTheme>('os');

  const switchTheme = useCallback(
    (newTheme: ColorTheme) => {
      document.body.classList.remove(theme);
      document.body.classList.add(newTheme);

      document.body.dataset['mode'] = newTheme;

      localStorage.setItem(COLOR_THEME_LOCAL_STORAGE_KEY, newTheme);

      setTheme(newTheme);
    },
    [theme]
  );

  useEffect(() => {
    const currentTheme = document.body.dataset['mode'];

    if (isColorTheme(currentTheme)) {
      switchTheme(currentTheme);
    }
  }, [switchTheme]);

  return (
    <DarkModeContext.Provider value={{ theme, switchTheme }}>
      {children}
    </DarkModeContext.Provider>
  );
};

/* ------------------------------- useContext ------------------------------- */

const useColorThemeContext = (): Context => {
  const context = useContext(DarkModeContext);

  if (context === undefined) {
    throw new Error('Must be use within ColorThemeContext');
  }

  return context;
};

export { ColorThemeProvider, useColorThemeContext };
