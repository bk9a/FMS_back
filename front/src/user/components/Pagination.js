import React from "react";

const Pagination = (props) => {
  const total = props.total;

  return (
    <div className="w-full flex justify-end items-center space-x-10 text-sm text-gray-500">
      <div>
        {props.page} of {total}
      </div>
      <div className="inline-flex -space-x-px z-0">
        <button
          onClick={props.prev}
          className={`border-gray-300 inline-flex rounded-l-md border px-4 py-2 ${
            props.page <= 1
              ? "cursor-default bg-gray-200"
              : "hover:bg-gray-100 cursor-pointer "
          }`}
        >
          prev
        </button>
        <button
          onClick={props.next}
          className={`border-gray-300 inline-flex rounded-r-md border px-4 py-2 ${
            props.page >= total
              ? "cursor-default bg-gray-200"
              : "hover:bg-gray-100 cursor-pointer"
          }`}
        >
          next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
