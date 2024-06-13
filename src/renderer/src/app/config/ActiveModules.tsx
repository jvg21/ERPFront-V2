import { ModuleType } from "@renderer/@types/ModuleType";
import { FaBuilding, FaCar } from "react-icons/fa";
import { CarMainPage } from "../modules/car/Page";
import { FaPerson } from "react-icons/fa6";
import { UserMainPage } from "../modules/user/Page";

type ActiveModulesType = {
    carModule:ModuleType,
    personModule:ModuleType
}

export const ActiveModules:ActiveModulesType = {
    carModule:{
        name:"Car",
        label:"Car",
        path:"/car",
        element: <CarMainPage/>,
        icon: <FaCar />,
    },
    personModule:{
        name:"User",
        label:"User",
        path:"/User",
        element:<UserMainPage/>,
        icon:<FaPerson />

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
