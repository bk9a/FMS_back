import React from "react";
import ListItem from "../News/ListItem";

const OtherFilters = (props) => {
  return (
    <div className="w-full laptop:w-[350px] laptop:min-w-[350px] laptop:max-w-[400px]">
      <h1 className="w-full rounded-t-md flex justify-center items-center bg-gradient-to-r from-sky-500 to-indigo-500 text-white h-10">
        Бусад
      </h1>
      <div className="w-full divide-y divide-dashed divide-gray-400">
        {props.data &&
          props.data.map((item, key) => {
            return (
              <ListItem
                LinkTo={`/filter/${item.id}`}
                key={key}
                title={item.title}
                img={item.img}
                id={item.id}
                showId={props.showId}
              />
            );
          })}
      </div>
    </div>
  );
};

export default OtherFilters;
