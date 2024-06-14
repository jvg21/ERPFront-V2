import { useContext } from "react";
import { LanguageContext } from "../contexts/LanguageContext";

export enum Sexs{
    Male = 1,
    Female = 2
}


export function getGender(Value: number): string {
    const { language } = useContext(LanguageContext);
    const Words = language.words;

    switch(Value){
        case 1:
            return Words.male
        default:
            return Words.female
    }
}