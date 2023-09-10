import React from "react";

const LogoSlide = (props) => {
  const alt = props.alt;
  const image = props.image;
  return (
    <div className="flex items-center justify-center h-60 px-4">
      <img
        className="h-40 w-auto object-contain hover:scale-110 duration-300"
        alt={alt}
        src={`data:image/jpg;base64,${image}`}
      />
    </div>
  );
};

export default LogoSlide;
