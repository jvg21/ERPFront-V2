import { LanguageType } from "../../@types/LanguageType";
import { CarModuleGerman } from "../modules/car/language/German";
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
        confirmationDeleteMessage: "Sind Sie sicher, dass Sie löschen möchten?",
        create: "Erstellen",
        id: "ID",
        confirm: "Bestätigen",
        delete: "Löschen",
        edit: "Bearbeiten",
        success: "Erfolg",
        error:"Fehler",
        email: "E-Mail",
        confirmationLogoutMessage: "Möchten Sie Ihren Logout bestätigen?",
        continue: "Weiter",
        login: "Anmelden",
        loginSuccessfulMessage: "Ihre Anmeldung war erfolgreich",
        logout: "Abmelden",
        password: "Passwort",
        return: "Zurück",
        "administator": "Administrator",
        "client": "Kunde",
        "seller": "Verkäufer",
        "female": "weiblich",
        "male": "männlich"
    
    },
    color:{
        red: "Rot",
        silver: "Silber",
        blue: "Blau",
        green: "Grün",
        black: "Schwarz",
        white: "Weiß",
        yellow: "Gelb",
        Beige: "Beige",
        grey: "Grau",
        pink: "Rosa",
        Purple: "Lila",
        brown: "Braun",
        orange: "Orange",
        Violet: "Violett",
        lilac: "Lila",
        indigo: "Indigo",
        darkblue: "Dunkelblau"
    },
    modules: {
        carModule: CarModuleGerman,
        userModule: UserModuleEnglish
    }
}
