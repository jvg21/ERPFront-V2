import { LanguageType } from "../../@types/LanguageType";
import { CarModuleEnglish } from "../modules/car/language/English";
import { PersonModuleEnglish } from "../modules/person/language/English";
import { ResellerModuleEnglish } from "../modules/reseller/language/English";

export const EnglishLanguage: LanguageType = {
    label: "English",
    name: "English",
    abbreviation: "Eng",
    words: {
        cancel: "Cancel",
        config: "Configure",
        send: "Send",
        language: "Language",
        options: "Options",
        theme: "Theme",
        user: "User",
        actions: "Actions",
        confirmationDelete: "Are you sure you want to delete?",
        create: "Create",
        id: "ID",
        confirm: "Confirm",
        delete: "Delete",
        edit: "Edit",
        success:"Success"
    },
    modules: {
        carModule: CarModuleEnglish,
        resellerModule:ResellerModuleEnglish,
        personModule:PersonModuleEnglish
    }
}
