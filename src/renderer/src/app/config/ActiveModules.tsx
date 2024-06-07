import { ModuleType } from "@renderer/@types/ModuleType";
import { FaBuilding, FaCar } from "react-icons/fa";
import { CarMainPage } from "../modules/car/Page";
import { PersonMainPage } from "../modules/person/Page";
import { FaPerson } from "react-icons/fa6";

type ActiveModulesType = {
    carModule:ModuleType,
    resellerModule:ModuleType,
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
    resellerModule:{
        name:"Reseller",
        label:"Reseller",
        path:"/reseller",
        element:<CarMainPage/>,
        icon:<FaBuilding/>
    },
    personModule:{
        name:"Person",
        label:"Person",
        path:"/person",
        element:<PersonMainPage/>,
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
