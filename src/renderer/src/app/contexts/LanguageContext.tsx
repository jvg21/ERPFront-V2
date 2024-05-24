import { LanguageType } from '@renderer/@types/LanguageType';
import { createContext, useState, ReactNode, useContext } from 'react';
import { EnglishLanguage } from '../languages/English.language';

type LanguageContextType = {
  language: LanguageType;
  changeLanguage: (language:LanguageType) => void;
};

const defaultValue = {
  language:EnglishLanguage,
  changeLanguage:(_:LanguageType)=>{},
}
const LanguageContext = createContext<LanguageContextType >(defaultValue);

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

export const useLanguage = useContext(LanguageContext)