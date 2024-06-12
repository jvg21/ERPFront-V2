import { CarModuleLanguageType } from "@renderer/app/modules/car/language/CarModuleLanguageType"
import { ResellerModuleLanguageType } from "@renderer/app/modules/reseller/language/ResellerModuleLanguageType"
import { UserModuleLanguageType } from "@renderer/app/modules/user/language/PersonModuleLanguageType"
import { ReactElement } from "react"

export type LanguageType = {
    label:string,
    name:string,
    abbreviation:string,
    icon?: ReactElement,
    color?:{
        red: string,
        silver: string,
        blue: string,
        green: string,
        black: string,
        white: string,
        yellow: string,
        Beige: string,
        grey: string,
        pink: string,
        Purple: string,
        brown: string,
        orange: string,
        Violet: string,
        lilac: string,
        indigo: string,
        darkblue: string
    }
    words:{
        send:string,
        create:string,
        actions:string,
        id:string
        cancel:string
        user:string,
        language:String
        config:string,
        theme:string,
        options:string
        confirmationDelete:string
        edit:string,
        delete:string,
        confirm:string,
        success:string,
        error:string
    },
    modules:{
        carModule:CarModuleLanguageType,
        resellerModule:ResellerModuleLanguageType,
        userModule:UserModuleLanguageType
    }
}