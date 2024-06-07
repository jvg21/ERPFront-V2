import { LanguageType } from "@renderer/@types/LanguageType";
import { BrazilianLanguage } from "../languages/Brazilian.language";
import { EnglishLanguage } from "../languages/English.language";
import { GermanLanguage } from "../languages/German.language";
import { SpanishLanguage } from "../languages/Spanish.language";

type ActiveLanguageType = {
    English:LanguageType,
    Portuguese:LanguageType,
    German: LanguageType,
    Spanish: LanguageType
}
export const ActiveLanguages:ActiveLanguageType = {
    English:EnglishLanguage,
    Portuguese:BrazilianLanguage,
    German: GermanLanguage,
    Spanish: SpanishLanguage
}