import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';

type ThemeType = 'light' | 'dark';

interface ThemeContextType {
  theme: ThemeType;
  toggleTheme: () => void;
  colors: typeof lightColors | typeof darkColors;
}

const lightColors = {
  primary: '#f3c988',
  background: '#ffffff',
  card: '#faf4eb',
  cardHighlight: '#fcf9f5',
  text: '#444444',
  textSecondary: '#666666',
  border: '#eeeeee',
  shadow: '#000000',
};

const darkColors = {
  primary: '#f3c988',
  background: '#2c2c2e',
  card: '#3a3a3c',
  cardHighlight: '#434345',
  text: '#ffffff',
  textSecondary: '#adadad',
  border: '#4c4c4e',
  shadow: '#000000',
};

export const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme: () => {},
  colors: lightColors,
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const systemColorScheme = useColorScheme();
  const [theme, setTheme] = useState<ThemeType>(systemColorScheme || 'light');

  const toggleTheme = () => {
    setTheme(curr => (curr === 'light' ? 'dark' : 'light'));
  };

  const colors = theme === 'light' ? lightColors : darkColors;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);