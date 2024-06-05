import { createContext, useState, ReactNode } from 'react';
import { ThemeType } from '../../@types/ThemeType';
import { DarkTheme } from '../themes/Dark.theme';

type ThemeContextType = {
  themeString: ThemeType;
};

const defaultValue = {
  themeString: DarkTheme,
}

export const ThemeStyleContext = createContext<ThemeContextType>(defaultValue);

export function ThemeStyleContextProvider({ children }: { children: ReactNode }) {
  const [themeString, _] = useState(defaultValue.themeString);

  return (
    <ThemeStyleContext.Provider value={{ themeString }}>
      {children}
    </ThemeStyleContext.Provider>
  );
}
