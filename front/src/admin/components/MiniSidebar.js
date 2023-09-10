import React from "react";
import Shadow from "../../user/components/Shadow";
import SidebarLink from "./SidebarLink";

const MiniSideBar = (props) => {
  return (
    <div className="laptop:hidden">
      <Shadow toggleSidebar={props.toggleSidebar} show={props.showSidebar} />
      <div
        className={`z-50 fixed w-[320px]  overflow-y-auto h-screen bg-slate-800 ${
          props.showSidebar
            ? "translate-x-0 duration-300"
            : "-translate-x-full duration-300"
        }`}
      >
        <SidebarLink />
      </div>
    </div>
  );
};

export default MiniSideBar;
