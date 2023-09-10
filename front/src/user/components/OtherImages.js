import React from "react";

const OtherImages = (props) => {
  return (
    <div className="w-full flex flex-wrap pt-8">
      {props.images.map((image, index) => {
        return (
          <img
            className={`w-[350px] h-[200px] mr-3 mb-3 cursor-pointer object-cover border border-slate-300`}
            key={index}
            src={image}
            onClick={() => props.openImageViewer(index)}
          />
        );
      })}
    </div>
  );
};

export default OtherImages;
