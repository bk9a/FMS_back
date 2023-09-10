import React from "react";
import { Link } from "react-router-dom";

export default function RCItem(props) {
  return (
    <div className="hidden w-full relative z-30 laptop:block">
      <div>
        <div className="bg-black/20 w-full h-full absolute"></div>
        <img
          className="w-[1000px] h-[500px] object-cover"
          src={`data:image/jpg;base64,${props.item.image_string}`}
        />
      </div>
      <Link to={props.item.url}>
        <div className="flex flex-col justify-center items-center w-full absolute text-white top-0 h-full">
          <h1 className="text-4xl font-semibold uppercase">
            {props.item.page_name}
          </h1>
          <p className="text-lg w-2/5 py-7">{props.item.text}</p>
          {/* <Link to={props.item.url}>
          <button className="bg-black rounded-full w-fit border-2 bg-opacity-60 p-2 hover:bg-gradient-to-r from-sky-500 to-indigo-500 hover:scale-125 duration-200">
            See more
          </button>
        </Link> */}
        </div>
      </Link>
    </div>
  );
}
