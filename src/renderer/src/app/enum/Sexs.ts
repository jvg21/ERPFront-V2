export enum Sexs{
    Male = 0,
    Female = 1
}

export function getSex(value: number): string {

    switch(value){
        case Sexs.Male:
            return "Male";
        case Sexs.Female:
            return "Female";
        default:
            return ""
    }
}
