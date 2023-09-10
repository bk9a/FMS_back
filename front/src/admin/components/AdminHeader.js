import React from "react";
import Icon from "../../user/components/Icon";
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai";
import DropDownMenu from "./DropDownMenu";
const AdminHeader = (props) => {
  return (
    <div className="w-full h-16 bg-white drop-shadow flex justify-between items-center px-5 z-50">
      <div
        onClick={props.toggleSidebar}
        className="rounded-full p-2.5 hover:bg-slate-200 duration-300 cursor-pointer"
      >
        <Icon
          color="black"
          size="26"
          iconn={
            props.showSidebar ? <AiOutlineMenuFold /> : <AiOutlineMenuUnfold />
          }
        />
      </div>
      <DropDownMenu />
    </div>
  );
};

export default AdminHeader;
