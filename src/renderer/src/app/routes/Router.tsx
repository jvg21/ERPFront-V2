
import { Route, Routes } from "react-router-dom";
import { CarMainPage } from "../modules/car/Page";
import { UserMainPage } from "../modules/user/Page";
import { LoginPage } from "@renderer/components/LoginPage";
import { ConfigPage } from "@renderer/components/ConfigPage";

export default function DashRoutes() {

    return (
        <>
            <Routes>
                <Route path="/" element={<a />} />
                <Route path="/car" element={<CarMainPage />} />
                <Route path="/config" element={<ConfigPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/user" element={<UserMainPage />} />
            </Routes>

        </>
    )
}