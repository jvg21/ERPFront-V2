import { CarMainPage } from "../modules/Car/Pages/CarMainPage"
import { FaCar } from "react-icons/fa";
import { ActivePagesType } from "../@types/ActivePagesType";

export const activepages: ActivePagesType[] = [
    { path: "/car", element: <CarMainPage />, icon: <FaCar />, label: "Carro" }
]