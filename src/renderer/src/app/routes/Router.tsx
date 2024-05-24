
import { Route, Routes } from "react-router-dom";
import { CarPage } from "../modules/car/Page";
import { ResellerPage } from "../modules/base copy/Page";

export default function DashRoutes() {

    return (
        <>
            <Routes>
                <Route path="/" element={<a/>}/>
                <Route path="/car" element={<CarPage/>}/>
                <Route path="/reseller" element={<ResellerPage/>}/>
            </Routes>

        </>
    )
}