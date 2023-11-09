import { createContext, useContext, useEffect } from 'react';
import { useLocalStorageState } from '../hooks/useLocalStorageState';

const ColorThemeContext = createContext(null);

const ColorThemeProvider = ({ children }) => {
  const [colorTheme, setColorTheme] = useLocalStorageState(
    'light',
    'colorTheme'
  );

  const isDarkMode = colorTheme === 'dark';
  const isLightMode = colorTheme === 'light';
  const setDarkMode = () => setColorTheme('dark');
  const setLightMode = () => setColorTheme('light');

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark-mode');
      document.documentElement.classList.remove('light-mode');
    }

    if (isLightMode) {
      document.documentElement.classList.add('light-mode');
      document.documentElement.classList.remove('dark-mode');
    }
  }, [colorTheme, isDarkMode, isLightMode]);

  return (
    <ColorThemeContext.Provider
      value={{ isDarkMode, isLightMode, setDarkMode, setLightMode }}
    >
      {children}
    </ColorThemeContext.Provider>
  );
};

const useColorTheme = () => {
  const context = useContext(ColorThemeContext);

  if (context == null) {
    throw new Error(
      'useColorTheme should be used only within ColorThemeProvider'
    );
  }

  return context;
};

export { ColorThemeProvider, useColorTheme };
