import React from 'react';

const ColorThemeScript = () => {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
              (function() {
                let localStorageTheme;
                try {
                  const currentTheme = localStorage.getItem("theme");
                  switch (currentTheme) {
                    case "light":
                      localStorageTheme = "light";
                      break;
                
                    case "dark":
                      localStorageTheme = "dark";
                      break;
                      
                    default:
                      break;
                  }
                } catch(error) {
                  console.log(error);
                  console.warn('Failed to access localStorage');
                }

                const userPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
                const systemTheme = userPrefersDark ? "dark" : "light";

                const theme = localStorageTheme ?? systemTheme;
                
                document.body.dataset.mode = theme;
                document.body.classList.add(theme);
              })();
            `,
      }}
    />
  );
};

export default ColorThemeScript;
