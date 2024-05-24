import React, { useContext, useEffect, useState } from 'react';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import MenuItem from 'antd/es/menu/MenuItem';
import { Navigate, useNavigate } from "react-router-dom";
import DashRoutes from '@renderer/app/routes/Router';
import { SidebarContext } from '@renderer/app/contexts/SidebarContext';
import { ActiveModules, ActiveModulesIndexes } from '@renderer/app/config/ActiveModules';


const { Header, Content, Footer, Sider } = Layout;

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
  const key = ActiveModules[id].path;

  return { label, icon, key } as MenuItem
}

function getMenuItems() {
  const Items: MenuItem[] = []
  for (let i of ActiveModulesIndexes()) {
    Items.push(assembleItem(i))

  }
  return Items;
}


const AppLayout = () => {

  const [menuItems, setItens] = useState<MenuItem[]>(getMenuItems());
  const navigate = useNavigate();

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    navigate(e.key)    
  };

  const {isSidebarActive, setSidebarActive} = useContext(SidebarContext);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: '100vh', width: "100vw" }}>
      <Sider collapsible collapsed={isSidebarActive} onCollapse={(value) => setSidebarActive(value)}>
        <div style={{height:'150px'}}></div>
        <Menu theme="dark" onClick={onClick} defaultSelectedKeys={['1']} mode="inline" items={menuItems} />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: '0 16px' }}>
          <div
            style={{
              padding: 24,
              minHeight: "95%",
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              margin: '16px 0',
              overflow:'hidden'
            }}
          >
            <DashRoutes/>
          </div>
        </Content>
        {/* <Footer style={{ textAlign: 'center' }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer> */}
      </Layout>
    </Layout>
  );
};

export default AppLayout;