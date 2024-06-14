
import { LanguageContext } from "@renderer/app/contexts/LanguageContext";
import { UserContext } from "@renderer/app/contexts/UserContext";
import { getRoles } from "@renderer/app/enum/Admin";
import { Header } from "antd/es/layout/layout";
import { useContext } from "react";
import { FaGear } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const HeaderStyle = styled(Header)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: ${(props)=>props.theme.background};
    color: ${(props)=>props.theme.text};
    padding: 0 20px;
`;

const ConfigButton = styled.button`
    height: 50%;
    width: 100px;
    display: flex;
    justify-content: space-around;
    align-items: center;

`;

export function LayoutHeader(){
    const navigate = useNavigate();
    const {language} = useContext(LanguageContext)
    const {UserData} = useContext(UserContext)

    return(
        <HeaderStyle>
        {`Olá, ${UserData.nameUser} - ${getRoles(UserData.idUser||3)}`}
        <ConfigButton onClick={()=>navigate('config')}>{language.words.config}<FaGear/></ConfigButton>
        </HeaderStyle>

    )
}