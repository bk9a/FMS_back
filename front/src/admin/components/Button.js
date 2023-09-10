import React from "react";
import Icon from "../../user/components/Icon";

const Button = (props) => {
  return (
    <button
      onClick={props.onClick}
      className="flex items-center space-x-3 text-center active:translate-y-[4px] active:shadow-[0_0_0_0_rgba(2,132,199,1)] shadow-[0_4px_0_0_rgba(2,132,199,1)] bg-sky-500 p-2 px-4 rounded-md text-md font-semibold text-white hover:bg-sky-400 duration-100 select-none w-fit h-fit"
    >
      {props.iconn && (
        <Icon
          size={props.iconSize}
          color={props.iconColor}
          iconn={props.iconn}
        />
      )}
      <p>{props.name}</p>
    </button>
  );
};

export default Button;
