import React from "react";
import SidebarLink from "./SidebarLink";

const AdminSidebar = (props) => {
  return (
    <div
      className={`w-[320px] h-screen bg-slate-800 overflow-y-auto hidden laptop:${
        props.showSidebar ? "block" : "hidden"
      }`}
    >
      <SidebarLink />
    </div>
  );
};

export default AdminSidebar;
