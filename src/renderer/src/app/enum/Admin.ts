import { useContext } from "react";
import { LanguageContext } from "../contexts/LanguageContext";

export enum Roles {
    Adm = 1,
    Vendedor = 2,
    Cliente = 3
}

export function getRoles(Value: number): string {
    const { language } = useContext(LanguageContext);
    const Words = language.words;

    switch(Value){
        case 1:
            return Words.administator
        case 2:
            return Words.seller
        default:
            return Words.client
    }
}