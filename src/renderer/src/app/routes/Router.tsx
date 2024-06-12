
import { Route, Routes } from "react-router-dom";
import { CarMainPage } from "../modules/car/Page";
import { ResellerMainPage } from "../modules/reseller/Page";
import { PersonMainPage } from "../modules/person/Page";
import { UserMainPage } from "../modules/user/Page";

export default function DashRoutes() {

    return (
        <>
            <Routes>
                <Route path="/" element={<a/>}/>
                <Route path="/car" element={<CarMainPage/>}/>
                <Route path="/reseller" element={<ResellerMainPage/>}/>
                <Route path="/user" element={<UserMainPage/>}/>
            </Routes>

        </>
    )
}