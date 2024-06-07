
import { Route, Routes } from "react-router-dom";
import { CarMainPage } from "../modules/car/Page";
import { ResellerMainPage } from "../modules/reseller/Page";
import { PersonMainPage } from "../modules/person/Page";

export default function DashRoutes() {

    return (
        <>
            <Routes>
                <Route path="/" element={<a/>}/>
                <Route path="/car" element={<CarMainPage/>}/>
                <Route path="/reseller" element={<ResellerMainPage/>}/>
                <Route path="/person" element={<PersonMainPage/>}/>
            </Routes>

        </>
    )
}