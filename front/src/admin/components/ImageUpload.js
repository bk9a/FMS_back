import React from "react";
import Icon from "../../user/components/Icon";

const ImageUpload = (props) => {
  return (
    <div className={props.styles}>
      <label htmlFor={props.id} className={props.labelStyle}>
        <Icon
          color={props.iconnColor}
          size={props.iconnSize}
          iconn={props.iconn}
        />
        <p>{props.txt}</p>
      </label>

      <input
        id={props.id}
        type="file"
        accept="image/*"
        multiple={props.multiple}
        className="hidden"
        onChange={props.imagesChange}
        onClick={props.onClick}
      />
    </div>
  );
};

export default ImageUpload;
