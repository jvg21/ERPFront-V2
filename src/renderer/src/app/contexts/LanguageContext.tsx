import { LanguageType } from '@renderer/@types/LanguageType';
import { createContext, useState, ReactNode } from 'react';
import { EnglishLanguage } from '../languages/English.language';

type LanguageContextType = {
  language: LanguageType;
  changeLanguage: (language:LanguageType) => void;
};

const defaultValue = {
  language:EnglishLanguage,
  changeLanguage:(_:LanguageType)=>{},
}
export const LanguageContext = createContext<LanguageContextType >(defaultValue);

export function LanguageContextProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState(defaultValue.language);

  function changeLanguage(language:LanguageType){
    setLanguage(language)
  }
  
  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}
