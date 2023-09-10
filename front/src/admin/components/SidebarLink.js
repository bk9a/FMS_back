import React from "react";
import { Link } from "react-router-dom";
import AdminMenu from "./AdminMenu";
import logoImg from "../../assets/img/itsys-logo.png";

const SidebarLink = () => {
  return (
    <div className={`flex flex-col items-center`}>
      <Link to="addnews">
        <img
          className="w-[200px] h-auto object-contain mt-7 mb-5 rounded-md select-none"
          src={logoImg}
        />
      </Link>
      <AdminMenu />
    </div>
  );
};

export default SidebarLink;
