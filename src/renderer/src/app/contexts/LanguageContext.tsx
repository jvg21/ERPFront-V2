import { LanguageType } from '@renderer/@types/LanguageType';
import { createContext, useState, ReactNode } from 'react';
import { ActiveLanguages } from '../config/ActiveLanguages';
import { StaticConfig } from '../config/config';
import { DataFormat } from '../enum/DataFormat';
type LanguageContextType = {
  language: LanguageType;
  dataFormat:string;
};

const defaultValue = {
  language:ActiveLanguages[localStorage.getItem(StaticConfig.languageKeyString)||"English"],
  dataFormat:DataFormat[Number(localStorage.getItem(StaticConfig.DataFormatString))||0],
}
export const LanguageContext = createContext<LanguageContextType >(defaultValue);

export function LanguageContextProvider({ children }: { children: ReactNode }) {
  const [language, __] = useState(defaultValue.language);
  const [dataFormat, _] = useState(defaultValue.dataFormat);
  return (
    <LanguageContext.Provider value={{ language,dataFormat }}>
      {children}
    </LanguageContext.Provider>
  );
}
