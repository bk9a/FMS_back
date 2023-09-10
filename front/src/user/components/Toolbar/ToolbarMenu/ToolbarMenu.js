import React from "react";
import ToolbarMenuItems from "./ToolbarMenuItems";

// {[top, bottom, ...], [margin, padding, ...], [width, height], [positions, ...], [flex justify, items, ...], [bg], [texts, ...], [hover, active, ...]}

const ToolbarMenu = () => {
  return (
    <div className="bg-slate-900 text-white w-full z-50 pr-4 desktop:pr-20 hidden tablet:block">
      <ToolbarMenuItems
        toolUlStyle="h-6 flex justify-end items-center text-xs space-x-3"
        toolLiStyle="hover:text-sky-400 duration-300"
        Iconsline
        line
        socialLink="space-x-3"
      />
    </div>
  );
};

export default ToolbarMenu;
