import React from "react";
import data from "../../assets/adminStore/AdminMenuList";
import { MenuItem } from "./MenuItem";

const AdminMenu = () => {
  return (
    <div className="w-[240px]">
      {data && data.length > 0
        ? data.map((item, key) => {
            return <MenuItem active item={item} key={"menu-" + key} />;
          })
        : null}
    </div>
  );
};

export default AdminMenu;
