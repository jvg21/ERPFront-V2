import { LanguageContext } from "@renderer/app/contexts/LanguageContext";
import { ThemeStyleContext } from "@renderer/app/contexts/ThemeStyleContext";
import LanguageSelect from "@renderer/components/utils/LanguageSelect";
import ThemeSelect from "@renderer/components/utils/ThemeSelect";
import { Header } from "antd/es/layout/layout";
import { useContext } from "react";
import styled from "styled-components";

const HeaderStyle = styled(Header)`
    display: flex;
    background-color: ${(props)=>props.theme.background};
    color: ${(props)=>props.theme.text};
    padding: 0;
`;

export function LayoutHeader(){
    const {language} = useContext(LanguageContext)
    const {themeString} = useContext(ThemeStyleContext)
    return(
        <HeaderStyle>
            <p>{language.name}</p>
            <p>{themeString.name}</p>
        <LanguageSelect/>
        <ThemeSelect/>
        </HeaderStyle>

    )
}