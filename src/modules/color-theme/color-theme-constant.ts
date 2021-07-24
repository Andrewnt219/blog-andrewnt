const colorThemes = ['light', 'dark', 'os'] as const;

export type ColorTheme = typeof colorThemes[number];

export const isColorTheme = (theme: any): theme is ColorTheme => {
  return colorThemes.includes(theme);
};

export const tryParseColorTheme = (theme: any): ColorTheme => {
  return isColorTheme(theme) ? theme : 'os';
};

export const COLOR_THEME_LOCAL_STORAGE_KEY = 'theme';
