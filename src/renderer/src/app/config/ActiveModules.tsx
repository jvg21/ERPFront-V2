import { ModuleType } from "@renderer/@types/ModuleType";
import { FaCar, FaChartBar } from "react-icons/fa";
import { MdAttachMoney } from "react-icons/md";
import { CarMainPage } from "../modules/car/Page";
import { FaPerson } from "react-icons/fa6";
import { UserMainPage } from "../modules/user/Page";
import { SalesMainPage } from "../modules/sales/Page";
import { MainChartPage } from "../modules/charts/MainChartPage";

type ActiveModulesType = {
    carModule: ModuleType,
    personModule: ModuleType,
    salesModule: ModuleType,
    chartModule:ModuleType
}


export const ActiveModules: ActiveModulesType = {
    carModule: {
        name: "Car",
        label: "Car",
        path: "/car",
        element: <CarMainPage />,
        icon: <FaCar />,
        permitionLevel: 3
    },
    personModule: {
        name: "User",
        label: "User",
        path: "/User",
        element: <UserMainPage />,
        icon: <FaPerson />,
        permitionLevel: 2

    },
    salesModule: {
        name: "Sales",
        label: "Sales",
        path: "/Sales",
        element: <SalesMainPage />,
        icon: <MdAttachMoney />,
        permitionLevel: 2

    },
    chartModule: {
        name: "Chart",
        label: "Chart",
        path: "/chart",
        element: <MainChartPage />,
        icon: <FaChartBar/>,
        permitionLevel: 2

    }
}

export function ActiveModulesIndexes() {
    const indexes: string[] = []
    for (let i in ActiveModules) {
        indexes.push(i)
    }

    return indexes
}

export function ActiveModulesLength() {
    return ActiveModulesIndexes().length
}
