import { CarModuleLanguageType } from "@renderer/app/modules/car/language/CarModuleLanguageType"
import { PersonModuleLanguageType } from "@renderer/app/modules/person/language/PersonModuleLanguageType"
import { ResellerModuleLanguageType } from "@renderer/app/modules/reseller/language/ResellerModuleLanguageType"
import { ReactElement } from "react"

export type LanguageType = {
    label:string,
    name:string,
    abbreviation:string,
    icon?: ReactElement,
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
        success:string
    },
    modules:{
        carModule:CarModuleLanguageType,
        resellerModule:ResellerModuleLanguageType,
        personModule:PersonModuleLanguageType
    }
}