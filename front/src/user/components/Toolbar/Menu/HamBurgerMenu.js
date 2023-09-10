import React from "react";

const HamBurgerMenu = (props) => {
  const style = "bg-black h-[3px]";
  return (
    <div
      onClick={props.toggleSidebar}
      className="w-[50px] h-full flex flex-col justify-around box-border tablet:hidden"
    >
      <div className={style}></div>
      <div className={style}></div>
      <div className={style}></div>
    </div>
  );
};

export default HamBurgerMenu;
