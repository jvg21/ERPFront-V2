
import { Header } from "antd/es/layout/layout";
import { FaGear } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const HeaderStyle = styled(Header)`
    display: flex;
    background-color: ${(props)=>props.theme.background};
    color: ${(props)=>props.theme.text};
    padding: 0;
`;

export function LayoutHeader(){
    const navigate = useNavigate();

    return(
        <HeaderStyle>
        <button onClick={()=>navigate('config')}><FaGear/></button>
        </HeaderStyle>

    )
}