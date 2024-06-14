import { LanguageType } from "../../@types/LanguageType";
import { CarModuleEnglish } from "../modules/car/language/English";
import { SaleModuleEnglish } from "../modules/sales/language/English";
import { UserModuleEnglish } from "../modules/user/language/English";

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
        confirmationDeleteMessage: "Are you sure you want to delete?",
        create: "Create",
        id: "ID",
        confirm: "Confirm",
        delete: "Delete",
        edit: "Edit",
        success:"Success",
        error:"error",
        email: "Email",
        confirmationLogoutMessage: "Want to confirm your log out?",
        continue: "Continue",
        login: "Login",
        loginSuccessfulMessage: "Your login was successful",
        logout: "Log out",
        password: "Password",
        return: "Return",
        administator: "administrador",
        client: "Client",
        seller: "Seller",
        female: "Female",
        male: "Male",
        selectDataFormat: "Select data format",
        selectLanguage: "Select language",
        selectTheme: "Select theme",
        charts:"charts"
    },
    color:{
        red: "Red",
        silver: "Silver",
        blue: "Blue",
        green: "Green",
        black: "Black",
        white: "White",
        yellow: "Yellow",
        beige: "Beige",
        grey: "Grey",
        pink: "Pink",
        purple: "Purple",
        brown: "Brown",
        orange: "Orange",
        Violet: "Violet",
        lilac: "Lilac",
        indigo: "Indigo",
        darkblue: "Dark blue"
    },
    modules: {
        carModule: CarModuleEnglish,
        userModule:UserModuleEnglish,
        salesModule: SaleModuleEnglish
    }
}
