import React from "react";
import MenuItems from "./Menu/MenuItems";
import Shadow from "../Shadow";
import Logo from "../Logo";
import ToolbarMenuItems from "./ToolbarMenu/ToolbarMenuItems";

const SideBar = (props) => {
  const open = "translate-x-0 duration-300";
  const close = "-translate-x-full duration-300";
  const style =
    "w-[280px] bg-white fixed inset-0 h-full z-50 px-[32px] pt-[16px] divide-y-2 divide-blue-600 overflow-y-auto";

  let classes = `${close} ${style}`;

  if (props.showSidebar) {
    classes = `${open} ${style}`;
  }
  return (
    <div>
      <Shadow show={props.showSidebar} toggleSidebar={props.toggleSidebar} />
      <div onClick={props.toggleSidebar} className={classes}>
        <Logo style="w-auto h-16 mb-6" />
        <div className="divide-y-2 divide-blue-600">
          <MenuItems
            liStyle="py-3"
            ulStyle="divide-y-2 divide-dashed divide-blue-400 text-md uppercase"
          />
          <ToolbarMenuItems
            toolLiStyle="py-3"
            toolUlStyle="divide-y-2 divide-dashed divide-blue-400 text-md uppercase"
            socialLink="py-3 space-x-4"
            IconSize="20"
          />
        </div>
      </div>
    </div>
  );
};

export default SideBar;
