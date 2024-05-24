import { LanguageType } from "@renderer/@types/LanguageType";
import { BrazilianLanguage } from "../languages/Brazilian.language";
import { EnglishLanguage } from "../languages/English.language";

type ActiveLanguageType = {
    english:LanguageType,
    portuguese:LanguageType
}
export const ActiveLanguages:ActiveLanguageType = {
    english:EnglishLanguage,
    portuguese:BrazilianLanguage,
}