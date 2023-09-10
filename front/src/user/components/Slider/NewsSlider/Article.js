import React from "react";
import { Link } from "react-router-dom";

export default function Article(props) {
  const title = props.title;
  const id = props.id;
  const image = props.image;

  return (
    // <div className="group h-full w-full flex flex-col px-2 text-[9px] tablet:px-4 tablet:text-xs laptop:text-base my-3">
    //   <div className="relative inset-0 w-full h-full text-white flex justify-center items-center">
    //     <div className="absolute w-full h-full group-hover:bg-black/70 duration-200"></div>
    //     <Link
    //       className="hidden absolute w-fit h-fit group-hover:block"
    //       to={`/user/news/${id}`}
    //     >
    //       <h6 className="hover:bg-blue-500 rounded-full border-2 border-white px-5 py-3 text-lg laptop:px-3 laptop:py-2 uppercase laptop:text-sm">
    //         үзэх
    //       </h6>
    //     </Link>
    //     <img
    //       className="top-0 h-[130px] w-[350px] object-cover"
    //       src={`data:image/jpg;base64,${image.imageString}`}
    //     />
    //   </div>
    //   <div className="flex items-center  border-t-4 border-blue-500 text-sm rounded-b-sm px-4 py-2 h-24 font-medium bg-white drop-shadow-md tablet:h-16 text-gray-700">
    //     <Link to={`/user/news/${id}`}>
    //       <h5 className="h-fit">
    //         {title.length > 40 ? `${title.slice(0, 40)}...` : title}
    //       </h5>
    //     </Link>
    //   </div>
    // </div>
    <div className="group h-full w-full flex flex-col px-2 text-[9px] tablet:px-4 tablet:text-xs laptop:text-base my-3">
      <div className="relative inset-0 w-full h-full text-white flex justify-center items-center">
        <Link to={`/user/news/${id}`}>
          <img
            className="top-0 h-[130px] w-[350px] object-cover"
            src={`data:image/jpg;base64,${image.imageString}`}
          />
        </Link>
      </div>
      <div className="flex items-center  border-t-4 border-blue-500 text-sm rounded-b-sm px-4 py-2 h-24 font-medium bg-white drop-shadow-md tablet:h-16 text-gray-700">
        <Link to={`/user/news/${id}`}>
          <h5 className="h-fit">
            {title.length > 40 ? `${title.slice(0, 40)}...` : title}
          </h5>
        </Link>
      </div>
    </div>
  );
}
