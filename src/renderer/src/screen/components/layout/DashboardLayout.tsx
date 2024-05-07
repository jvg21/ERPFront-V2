import { useState } from "react";
import styled from "styled-components";

const Sidebar = styled.div`
    min-height: 100%;
`

export const DashboardLayout = () => {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <Layout>
            <Sidebar></Sidebar>
            <Layout>
                <Header></Header>
                <Content></Content>
                <Footer></Footer>
            </Layout>
        </Layout>
        )
}