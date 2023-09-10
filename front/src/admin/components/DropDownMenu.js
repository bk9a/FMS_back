import React, { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "../../user/components/Icon";
import { BsPersonCircle } from "react-icons/bs";
import { useAlert } from "react-alert";
import { useAuth } from "../context/auth.js";

const DropDownMenu = () => {
  const [showMenu, setShowMenu] = useState(false);
  const clicked = () => {
    setShowMenu((prev) => !prev);
  };
  const alert = useAlert();
  const { LogOut } = useAuth();
  const logout1 = () => {
    clicked();
    alert.show("Системээс гарах уу ?", {
      closeCopy: "Буцах",
      actions: [
        {
          copy: "Тийм",
          onClick: () => LogOut(),
        },
      ],
    });
    alert.removeAll();
  };

  return (
    <div className="relative cursor-pointer z-50">
      <div
        onClick={clicked}
        className="rounded-full p-2.5 hover:bg-slate-200 duration-300 cursor-pointer"
      >
        <Icon color="black" size="26" iconn={<BsPersonCircle />} />
      </div>
      {showMenu && (
        <div className="right-0 top-12 absolute flex flex-col justify-center items-center bg-white border border-slate-300 rounded drop-shadow-sm divide-y w-32 h-fit text-slate-600 font-semibold z-40">
          <Link
            className="w-full h-full hover:bg-sky-400 hover:text-white duration-150 rounded-b"
            onClick={logout1}
            to="/admin"
          >
            <button className="w-full h-10 font-semibold">Гарах</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default DropDownMenu;
