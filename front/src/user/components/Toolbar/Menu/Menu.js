import React, { useState } from "react";
import SideBar from "../SideBar";
import HamBurgerMenu from "./HamBurgerMenu";
import MenuItems from "./MenuItems";
import Logo from "../../Logo";

// sticky top-0 drop-shadow-md  w-full py-2 px-24 flex justify-between items-center bg-white  text-black text-sm z-50
// liStyle="ml-10 hover:text-sky-400 duration-300 uppercase"

const Menu = (props) => {
  return (
    <div className="bg-white text-black z-30 h-20 w-full drop-shadow py-4 px-4 text-sm flex justify-between items-center tablet:text-xs laptop:text-sm desktop:text-base desktop:px-20 tablet:sticky tablet:top-0">
      <HamBurgerMenu toggleSidebar={props.toggleSidebar} />
      <Logo style="w-auto h-14 right-0" />
      <MenuItems
        ulStyle="hidden tablet:flex tablet:space-x-4 laptop:space-x-10"
        liStyle="uppercase hover:text-blue-500 duration-200 "
      />
    </div>
  );
};

export default Menu;
