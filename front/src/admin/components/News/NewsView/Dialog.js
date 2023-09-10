import React from "react";
import Shadow from "../../../../user/components/Shadow";

const Dialog = (props) => {
  console.log("===> dialog");
  return (
    <div
      className={`${
        props.showDialog ? "block" : "hidden"
      } z-40 absolute w-full h-screen`}
    >
      <div className="flex flex-col justify-center items-center bg-sky-500 text white w-fit h-fit z-50">
        <p>Та мэдээг устгахдаа итгэлтэй байна уу ?</p>
        <button onClick={props.deleteNews}>устгах</button>
      </div>
      <Shadow toggleSidebar={props.toggleDialog} show={props.showDialog} />
    </div>
  );
};

export default Dialog;
