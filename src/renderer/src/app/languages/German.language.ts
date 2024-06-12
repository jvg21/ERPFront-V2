import { LanguageType } from "../../@types/LanguageType";
import { CarModuleGerman } from "../modules/car/language/German";
import { ResellerModuleEnglish } from "../modules/reseller/language/English";
import { UserModuleEnglish } from "../modules/user/language/English";


export const GermanLanguage: LanguageType = {
    label: "German",
    name: "German",
    abbreviation: "Ger",
    words: {
        cancel: "Abbrechen",
        config: "Konfigurieren",
        send: "Senden",
        language: "Sprache",
        options: "Optionen",
        theme: "Thema",
        user: "Benutzer",
        actions: "Aktionen",
        confirmationDelete: "Sind Sie sicher, dass Sie löschen möchten?",
        create: "Erstellen",
        id: "ID",
        confirm: "Bestätigen",
        delete: "Löschen",
        edit: "Bearbeiten",
        success: "Erfolg",
        error:"Fehler"
    },
    modules: {
        carModule: CarModuleGerman,
        resellerModule: ResellerModuleEnglish,
        userModule: UserModuleEnglish
    }
}
