import { ModuleType } from "@renderer/@types/ModuleType";
import { CarPage } from "../modules/car/Page";
import { FaBuilding, FaCar } from "react-icons/fa";

type ActiveModulesType = {
    carModule:ModuleType,
    resellerModule:ModuleType
}

export const ActiveModules:ActiveModulesType = {
    carModule:{
        name:"Car",
        label:"Car",
        path:"/car",
        element: <CarPage/>,
        icon: <FaCar />,
    },
    resellerModule:{
        name:"Reseller",
        label:"Reseller",
        path:"/reseller",
        element:<CarPage/>,
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
