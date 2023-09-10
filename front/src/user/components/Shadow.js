import React from "react";

const Shadow = (props) => {
  return (
    <div
      onClick={props.toggleSidebar}
      className={`${
        props.show ? "block" : "hidden"
      } fixed inset-y-0 z-40 w-full h-full bg-black/60`}
    ></div>
  );
};

export default Shadow;
