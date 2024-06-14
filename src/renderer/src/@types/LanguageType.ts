import { CarModuleLanguageType } from "@renderer/app/modules/car/language/CarModuleLanguageType"
import { SalesModuleLanguageType } from "@renderer/app/modules/sales/language/SalesModuleLanguageType"
import { UserModuleLanguageType } from "@renderer/app/modules/user/language/PersonModuleLanguageType"
import { ReactElement } from "react"

export type LanguageType = {
    label:string,
    name:string,
    abbreviation:string,
    icon?: ReactElement,
    dataFormat?:string
    color:{
        red: string,
        silver: string,
        blue: string,
        green: string,
        black: string,
        white: string,
        yellow: string,
        beige: string,
        grey: string,
        pink: string,
        purple: string,
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
        edit:string,
        delete:string,
        confirm:string,
        success:string,
        error:string,
        login:string,
        logout:string,
        return:string,
        email:string,
        password:string,
        continue:string,
        male:string,
        female:string,
        administator:string,
        seller:string,
        client:string,
        loginSuccessfulMessage:string,
        confirmationLogoutMessage:string,
        confirmationDeleteMessage:string
        },
    modules:{
        carModule:CarModuleLanguageType,
        userModule:UserModuleLanguageType,
        salesModule:SalesModuleLanguageType
    }
}