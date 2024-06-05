import { LanguageType } from '@renderer/@types/LanguageType';
import { createContext, useState, ReactNode } from 'react';
import { ActiveLanguages } from '../config/ActiveLanguages';

type LanguageContextType = {
  language: LanguageType;
  changeLanguage: (language:LanguageType) => void;
};

const defaultValue = {
  language:ActiveLanguages[localStorage.getItem("theme_String")||"english"],
  changeLanguage:(_:LanguageType)=>{},
}
export const LanguageContext = createContext<LanguageContextType >(defaultValue);

export function LanguageContextProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState(defaultValue.language);

  function changeLanguage(language:LanguageType){
    setLanguage(language)
    localStorage.setItem("theme_string",language.name)
  }
  
  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}
