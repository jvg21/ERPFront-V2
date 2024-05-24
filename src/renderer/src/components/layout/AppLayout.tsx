import React, { useContext, useState } from 'react';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu, theme } from 'antd';
import { SidebarContext } from '@renderer/app/contexts/SidebarContext';
import styled from 'styled-components';
import { ActiveModules, ActiveModulesIndexes } from '@renderer/app/config/ActiveModules';
import DashRoutes from '@renderer/app/routes/Router';

const { Header, Content, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}


function assembleItem(id: string) {
  // console.log(ActivePages[id].config.options)
  const label = ActiveModules[id].label
  const icon = ActiveModules[id].icon;
  const key = ActiveModules[id].name;
  return { label, icon, key } as MenuItem
}

function getMenuItems() {
  const Items: MenuItem[] = []
  for (let i of ActiveModulesIndexes()) {
    Items.push(assembleItem(i))

  }
  return Items;

}
const StyledMenu = styled(Menu)`

`;



const App: React.FC = () => {
  const { isSidebarActive, setSidebarActive } = useContext(SidebarContext);
  const { token: { colorBgContainer, borderRadiusLG },} = theme.useToken();
  const [menuItens,setMenuItens] = useState<MenuItem[]>(getMenuItems())

  return (
    <Layout style={{ minHeight: '100vh', width: "100vw" }}>

      <Sider collapsible collapsed={isSidebarActive} onCollapse={(value) => setSidebarActive(value)} >
        <div style={{height:"150px"}}></div>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={menuItens}  />
      </Sider>

      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: '0 16px' }}>
          <div
            style={{
              margin: "16px",
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              height: "95%"
            }}
          >
            <DashRoutes/>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;