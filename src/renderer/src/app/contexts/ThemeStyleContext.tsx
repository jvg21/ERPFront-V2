import { createContext, useState, ReactNode } from 'react';
import { ThemeType } from '../../@types/ThemeType';
import { ActiveThemes } from '../config/ActiveThemes';
import { StaticConfig } from '../config/config';

type ThemeContextType = {
  themeString: ThemeType;
};

const defaultValue = {
  themeString: ActiveThemes[localStorage.getItem(StaticConfig.themeKeyString)||"Light"],
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
