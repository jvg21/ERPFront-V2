import { createContext, useState, ReactNode, useContext } from 'react';
import { ThemeType } from '../../@types/ThemeType';
import { LightTheme } from '@renderer/app/themes/Light.theme';

type ThemeContextType = {
  themeString: ThemeType;
  changeTheme: (theme:ThemeType) => void;
};

const defaultValue = {
  themeString:LightTheme,
  changeTheme:(theme:ThemeType)=>{},
}

const ThemeStyleContext = createContext<ThemeContextType >(defaultValue);

export function ThemeStyleContextProvider({ children }: { children: ReactNode }) {
  const [themeString, setThemeString] = useState(defaultValue.themeString);

  function changeTheme(theme:ThemeType){
    setThemeString(theme)
  }
  
  return (
    <ThemeStyleContext.Provider value={{ themeString, changeTheme }}>
      {children}
    </ThemeStyleContext.Provider>
  );
}

export const useThemeStyle = useContext(ThemeStyleContext);