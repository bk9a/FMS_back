import React from "react";
import { ImFacebook } from "react-icons/im";
import { ImTwitter } from "react-icons/im";
import Icon from "../../Icon";

const SocialLinks = (props) => {
  return (
    <div className={props.style}>
      {props.iconn && (
        <Icon iconn={props.iconn} size={props.size} color={props.color} />
      )}
      {props.Iconsline && <div className="text-[9px]">|</div>}
      <div className={props.IconStyle}>
        <a target="_blank" href="https://www.facebook.com/">
          <Icon
            iconn={<ImFacebook />}
            size={props.IconSize ? props.IconSize : "14"}
          />
        </a>
        {props.txt && <p>facebook</p>}
      </div>
      {props.Iconsline && <div className="text-[9px]">|</div>}
      <div className={props.IconStyle}>
        <a target="_blank" href="https://www.twitter.com/">
          <Icon
            iconn={<ImTwitter />}
            size={props.IconSize ? props.IconSize : "14"}
          />
        </a>
        {props.txt && <p>twitter</p>}
      </div>
      {/* {props.Iconsline && <div className="text-[9px]">|</div>} */}
    </div>
  );
};

export default SocialLinks;
