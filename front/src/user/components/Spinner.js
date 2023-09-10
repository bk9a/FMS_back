import React from "react";

const Spinner = (props) => {
  return (
    <div className={props.style ? props.style : null}>
      <div className="flex items-center justify-center space-x-2 animate-pulse py-5">
        <div className={`w-4 h-4 bg-blue-500 rounded-full`}></div>
        <div className={`w-4 h-4 bg-blue-500 rounded-full`}></div>
        <div className={`w-4 h-4 bg-blue-500 rounded-full`}></div>
      </div>
    </div>
  );
};

export default Spinner;
