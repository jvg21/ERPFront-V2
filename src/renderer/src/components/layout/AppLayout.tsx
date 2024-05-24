import React, { useContext, useState } from 'react';

import type { MenuProps } from 'antd';
import { Layout, Menu, theme } from 'antd';
import MenuItem from 'antd/es/menu/MenuItem';
import { useNavigate } from "react-router-dom";
import DashRoutes from '@renderer/app/routes/Router';
import { SidebarContext } from '@renderer/app/contexts/SidebarContext';
import { ActiveModules, ActiveModulesIndexes } from '@renderer/app/config/ActiveModules';
import { LayoutHeader } from './header/LayoutHeader';


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

  const [menuItems,_] = useState<MenuItem[]>(getMenuItems());
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
        <LayoutHeader />
        <Content style={{ margin: '0 16px' }}>
          <div
            style={{
              padding: 24,
              minHeight: "95%",
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              margin: '16px 0',
              overflowY: "auto",  // Enable vertical scrolling
              maxHeight: 'calc(100vh - 128px)',  // Adjust this as needed to fit your layout
            }}
          >
            <DashRoutes/>
          </div>
        </Content>

        <p>sadsa</p>
      </Layout>
    </Layout>
  );
};

export default AppLayout;