import { LanguageType } from "@renderer/@types/LanguageType";
import { BrazilianLanguage } from "../languages/Brazilian.language";
import { EnglishLanguage } from "../languages/English.language";

type ActiveLanguageType = {
    English:LanguageType,
    Portuguese:LanguageType
}
export const ActiveLanguages:ActiveLanguageType = {
    English:EnglishLanguage,
    Portuguese:BrazilianLanguage,
}