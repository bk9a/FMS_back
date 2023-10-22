import React, { useState } from "react";
import {
  MailOutlined,
  UserOutlined,
  ShoppingOutlined,
  CalculatorOutlined,
} from "@ant-design/icons";
import { Button, Menu, Avatar, Modal } from "antd";
import ViewCourse from "./ViewCourse";
import Payment from "./Payment";
import Profile from "./Profile.js";
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
  getItem(
    <a href="https://ant.design" rel="noopener noreferrer">
      Төлбөр
    </a>,
    "9",
    <ShoppingOutlined />
  ),
  getItem(
    <a href="https://ant.design" rel="noopener noreferrer">
      Тооцоолуур
    </a>,
    "9",
    <CalculatorOutlined />
  ),
];
const AdminHome = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const link = () => {
    console.log("test");
  };
  return (
    <div className="w-full h-screen flex">
      <div className="flex flex-col h-full w-[350px] border-r border-bordercolor">
        <div className="w-full h-1/4 flex justify-center items-center">
          <img className="w-40 bg-teal-50" src="logo.png" />
        </div>
        <Menu
          className="h-3/4 w-[350px]"
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
        <div className="z-50 w-full flex justify-between items-center text-teal-700">
          <p className="font-semibold text-2xl">Body Hacker</p>
          <Avatar size={40} icon={<UserOutlined />} />
        </div>
        <div className="w-full h-fit">
          {/* <Payment /> */}
          <Profile />
          {/* <ViewCourse /> */}
        </div>
      </div>
    </div>
  );
};
export default AdminHome;
