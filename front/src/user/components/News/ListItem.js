import React from "react";
import { Link } from "react-router-dom";
import { MdDateRange } from "react-icons/md";
import Icon from "../Icon";

const ListItem = (props) => {
  const LinkTo = props.LinkTo;

  return (
    <div
      className={`flex w-full laptop:w-[350px] h-28 py-2 ${
        props.id === props.showId ? "bg-slate-200" : null
      }`}
    >
      <Link className="p-0 m-0" to={LinkTo}>
        <div className="relative h-full w-24">
          <img
            className="inset-0 h-full w-full object-cover"
            src={`data:image/jpg;base64,${props.img.imageString}`}
          />
          <div className="absolute inset-0 h-full w-full hover:bg-black/40 duration-200"></div>
        </div>
      </Link>
      <div className="w-full flex flex-col justify-between font-semibold uppercase">
        <Link to={LinkTo}>
          <h1 className="ml-2 text-[13px]">{props.title}</h1>
        </Link>
        <div className="flex items-center justify-end text-xs mr-1">
          {props.date && <Icon size="17" iconn={<MdDateRange />} />}
          <p className="ml-2 text-slate-400">{props.date}</p>
        </div>
      </div>
    </div>
  );
};

export default ListItem;
