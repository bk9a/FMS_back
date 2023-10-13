import React, { useState } from 'react';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { NavLink ,Route, Routes,Outlet } from 'react-router-dom';
import Customer from '../admin/customer/Table';
const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon,url, children) {
  return {
    key,
    icon,
    children,
    label:<NavLink to={url}>{label}</NavLink>,
  };
}
const items = [
  getItem('Хэрэглэгч', '1', <UserOutlined />, 'customer'),
  getItem('Хичээл', '2', <PieChartOutlined />,'lesson'),
  getItem('Анги', '3',<PieChartOutlined />, '/class'),
  getItem('Хоол', '4',<DesktopOutlined />, '/food'),

  // getItem('User', 'sub1', <UserOutlined />, [
  //   getItem('Tom', '3'),
  //   getItem('Bill', '4'),
  //   getItem('Alex', '5'),
  // ]),
  // getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
  // getItem('Files', '9', <FileOutlined />),
];
const Admin = ({children}) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items}  />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        />
        <Content
          style={{
            margin: '0 16px',
          }}
        >
          {/* <Breadcrumb
            style={{
              margin: '16px 0',
            }}
          >
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb> */}
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
            }}
          >
                    <Outlet />
          </div> 
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
           ©2023 
        </Footer>
      </Layout>
    </Layout>
  );
}; 
export default Admin;