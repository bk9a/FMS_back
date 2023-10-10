import React, { useState } from "react";
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import { Button, Menu } from "antd";
import ViewCourse from "../Components/ViewCourse";

const AdminHome = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [video, setVideo] = useState(
    "https://www.youtube.com/embed/3sEeVJEXTfY?si=4sZr9DkiSaC4QIZr"
  );
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
    getItem("Level 1", "sub1", <AppstoreOutlined />, [
      getItem(
        <div
          onClick={() =>
            setVideo(
              "https://www.youtube.com/embed/3sEeVJEXTfY?si=4sZr9DkiSaC4QIZr"
            )
          }
        >
          Video 1
        </div>,
        "5"
      ),
      getItem(
        <div
          onClick={() =>
            setVideo(
              "https://www.youtube.com/embed/7KSNmziMqog?si=lQbXAPUzncBz_tHU"
            )
          }
        >
          Video 2
        </div>,
        "6"
      ),
      getItem(
        <div
          onClick={() =>
            setVideo(
              "https://www.youtube.com/embed/1f8yoFFdkcY?si=9cMLf-FTE2-W8YTY"
            )
          }
        >
          Video 3
        </div>,
        "7"
      ),
      getItem(
        <div
          onClick={() =>
            setVideo(
              "https://www.youtube.com/embed/3sEeVJEXTfY?si=4sZr9DkiSaC4QIZr"
            )
          }
        >
          Video 4
        </div>,
        "8"
      ),
    ]),
    getItem("Level 2", "sub2", <AppstoreOutlined />, [
      getItem(
        <div
          onClick={() =>
            setVideo(
              "https://www.youtube.com/embed/3sEeVJEXTfY?si=4sZr9DkiSaC4QIZr"
            )
          }
        >
          Video 1
        </div>,
        "5"
      ),
      getItem(
        <div
          onClick={() =>
            setVideo(
              "https://www.youtube.com/embed/3sEeVJEXTfY?si=4sZr9DkiSaC4QIZr"
            )
          }
        >
          Video 2
        </div>,
        "6"
      ),
      getItem(
        <div
          onClick={() =>
            setVideo(
              "https://www.youtube.com/embed/3sEeVJEXTfY?si=4sZr9DkiSaC4QIZr"
            )
          }
        >
          Video 3
        </div>,
        "7"
      ),
      getItem(
        <div
          onClick={() =>
            setVideo(
              "https://www.youtube.com/embed/3sEeVJEXTfY?si=4sZr9DkiSaC4QIZr"
            )
          }
        >
          Video 4
        </div>,
        "8"
      ),
    ]),
  ];

  return (
    <div className="w-full h-fit p-10 bg-white flex flex-col rounded-md drop-shadow-md space-y-4">
      <div className="w-full h-[500px] bg-slate-500">
        <iframe
          className="w-full h-full"
          src={video}
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
      <Menu
        className="h-fit w-full border-0"
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        theme="light"
        inlineCollapsed={collapsed}
        items={items}
      />
    </div>
  );
};
export default AdminHome;
