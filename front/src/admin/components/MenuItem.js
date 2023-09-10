import React, { useState } from "react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import Icon from "../../user/components/Icon";
import { Link } from "react-router-dom";

export const MenuItem = (props) => {
  const [open, setOpen] = useState(false);
  const item = props.item;
  const clickedfunc = () => {
    setOpen((prevShowSidebar) => !prevShowSidebar);
  };

  return (
    <div>
      <Link
        className={`flex items-center justify-between text-white text-lg py-3 px-2 my-1.5 group hover:bg-slate-600 duration-300 rounded-md`}
        key={"li-" + item.key}
        to={item.url ? item.url : "#"}
        onClick={item.DropDownMenus && clickedfunc}
      >
        <div className="flex items-center space-x-3">
          <Icon size="18" iconn={item.icon} />
          <div className="cursor-pointer select-none">{item.name}</div>
        </div>

        {item.DropDownMenus && (
          <div className="cursor-pointer rounded">
            <Icon
              size="17"
              color="FFFFFF"
              iconn={!open ? <AiOutlinePlus /> : <AiOutlineMinus />}
            />
          </div>
        )}
      </Link>
      {open && item.DropDownMenus ? (
        <div key={"liDiv-" + item.key} className="flex flex-col">
          {item.DropDownMenus.map((drop, key) => {
            return (
              <Link
                key={"drop-" + key}
                className="text-white ml-3 py-2 px-3 text-lg hover:bg-slate-600 duration-300 rounded-r-md select-none border-l"
                to={drop.url ? drop.url : "#"}
              >
                {drop.name}
              </Link>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};
