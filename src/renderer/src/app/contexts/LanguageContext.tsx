import { LanguageType } from '@renderer/@types/LanguageType';
import { createContext, useState, ReactNode } from 'react';
import { ActiveLanguages } from '../config/ActiveLanguages';
import { StaticConfig } from '../config/config';
type LanguageContextType = {
  language: LanguageType;
};

const defaultValue = {
  language:ActiveLanguages[localStorage.getItem(StaticConfig.languageKeyString)||"English"],
}
export const LanguageContext = createContext<LanguageContextType >(defaultValue);

export function LanguageContextProvider({ children }: { children: ReactNode }) {
  const [language, _] = useState(defaultValue.language);
  return (
    <LanguageContext.Provider value={{ language }}>
      {children}
    </LanguageContext.Provider>
  );
}
