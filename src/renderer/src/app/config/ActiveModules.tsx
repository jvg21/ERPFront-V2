import { ModuleType } from "@renderer/@types/ModuleType";
import { FaBuilding, FaCar } from "react-icons/fa";
import { CarMainPage } from "../modules/car/Page";

type ActiveModulesType = {
    carModule:ModuleType,
    resellerModule:ModuleType
}

export const ActiveModules:ActiveModulesType = {
    carModule:{
        name:"Car",
        label:"Car",
        path:"/car",
        element: <CarMainPage/>,
        icon: <FaCar />,
    },
    resellerModule:{
        name:"Reseller",
        label:"Reseller",
        path:"/reseller",
        element:<CarMainPage/>,
        icon:<FaBuilding/>
    }
}


export function ActiveModulesIndexes(){
    const indexes:string[] = []
    for(let i in ActiveModules) {
        indexes.push(i)
    }

    return indexes
}

export function ActiveModulesLength(){
    return ActiveModulesIndexes().length
}
