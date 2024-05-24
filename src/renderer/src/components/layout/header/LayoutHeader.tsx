import LanguageSelect from "@renderer/components/utils/LanguageSelect";
import { Header } from "antd/es/layout/layout";

export function LayoutHeader(){
    return(
        <Header style={{ padding: 0, background:  "white"}} >


        <LanguageSelect/>
        </Header>

    )
}