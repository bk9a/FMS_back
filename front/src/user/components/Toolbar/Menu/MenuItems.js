import React from "react";
import { NavLink } from "react-router-dom";
import { MenuItemList } from "../../../../assets/store/MenuItemList";
import Icon from "../../Icon";

const MenuItems = (props) => {
  return (
    <ul className={props.ulStyle}>
      {MenuItemList &&
        MenuItemList.map((item, key) => {
          return (
            <li className={props.liStyle} key={"li-" + key}>
              {props.iconn ? (
                <Icon
                  size={props.iconnSize}
                  color={props.iconnColor}
                  iconn={props.iconn}
                />
              ) : null}
              <NavLink to={item.url ? item.url : "#"}>{item.name}</NavLink>
            </li>
          );
        })}
    </ul>
  );
};

export default MenuItems;
