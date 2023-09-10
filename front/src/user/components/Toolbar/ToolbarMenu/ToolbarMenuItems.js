import React from "react";
import { NavLink } from "react-router-dom";
import { ToolbarMenuList } from "../../../../assets/store/ToolbarMenuList";
import Icon from "../../Icon";
import SocialLinks from "./SocialLinks";

const ToolbarMenuItems = (props) => {
  return (
    <ul className={props.toolUlStyle}>
      {ToolbarMenuList &&
        ToolbarMenuList.map((item, key) => {
          return (
            <div
              className={`flex items-center space-x-3 ${
                item.Name === "Мэдээ" && props.line ? "hidden" : null
              }`}
              key={"li-" + key}
            >
              {props.line ? <li className="text-[9px]">|</li> : null}
              <li className={`${props.toolLiStyle}`}>
                {props.iconn ? (
                  <Icon
                    size={props.iconnSize}
                    color={props.iconnColor}
                    iconn={props.iconn}
                  />
                ) : null}
                {item.link ? (
                  <a href={item.Url} target="_blank">
                    {item.Name}
                  </a>
                ) : (
                  <NavLink to={item.Url ? item.Url : "#"}>{item.Name}</NavLink>
                )}
              </li>
            </div>
          );
        })}
      <SocialLinks
        iconn={props.iconn}
        color={props.iconnColor}
        size={props.iconnSize}
        Iconsline={props.Iconsline}
        style={`flex items-center ${props.socialLink}`}
        IconStyle={props.IconStyle}
        IconSize={props.IconSize}
      />
    </ul>
  );
};

export default ToolbarMenuItems;
