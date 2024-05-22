import { ReactElement } from "react"

export type LanguageType = {
    code:string,
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
        confirm:string
    },
    modules:{
        carModule:null
    }
}