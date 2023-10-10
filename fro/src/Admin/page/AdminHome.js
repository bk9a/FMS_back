import React, { useState } from "react";
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Menu, Avatar } from "antd";
import ViewCourse from "../Components/ViewCourse";
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const items = [
  // getItem("Option 1", "1", <PieChartOutlined />),
  // getItem("Option 2", "2", <DesktopOutlined />),
  // getItem("Option 3", "3", <ContainerOutlined />),
  getItem("Courses", "sub1", <MailOutlined />, [
    getItem(
      <a href="https://ant.design" rel="noopener noreferrer">
        Course 1
      </a>,
      "5"
    ),
    getItem(
      <a href="https://ant.design" rel="noopener noreferrer">
        Course 2
      </a>,
      "6"
    ),
    getItem(
      <a href="https://ant.design" rel="noopener noreferrer">
        Course 3
      </a>,
      "7"
    ),
    getItem(
      <a href="https://ant.design" rel="noopener noreferrer">
        Course 4
      </a>,
      "8"
    ),
  ]),
  // getItem("Navigation Two", "sub2", <AppstoreOutlined />, [
  //   getItem("Option 9", "9"),
  //   getItem("Option 10", "10"),
  //   getItem("Submenu", "sub3", null, [
  //     getItem("Option 11", "11"),
  //     getItem("Option 12", "12"),
  //   ]),
  // ]),
];
const AdminHome = () => {
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const link = () => {
    console.log("test");
  };
  return (
    <div className="w-full h-screen flex">
      <div className="flex flex-col h-full w-[350px]">
        <Menu
          className="h-full w-[350px]"
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          mode="inline"
          theme="light"
          inlineCollapsed={collapsed}
          items={items}
          onClick={link}
        />
      </div>
      <div className="flex flex-col items-center bg-slate-100 w-full h-full overflow-y-auto pt-4 pb-8 px-8 space-y-4">
        <div className="z-50 w-full flex justify-end">
          <Avatar size={40} icon={<UserOutlined />} />
        </div>
        <ViewCourse />
      </div>
    </div>
  );
};
export default AdminHome;
