import { ReactElement } from "react";

export type ModuleType = {
    name:string,
    label:string,
    path:string,
    element: ReactElement,
    icon: ReactElement,
    permitionLevel:number
}