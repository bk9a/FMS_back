import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const Card = (props) => {
  const data = props.data;
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="w-fit flex justify-center drop-shadow-md my-8">
      <ul className="grid grid-cols-1 justify-items-stretch tablet:grid-cols-2 desktop:grid-cols-3 gap-16">
        {data && data.length > 0
          ? data.map((item, key) => {
              return (
                <li
                  className="flex flex-col items-start w-full laptop:w-96 bg-white rounded space-y-4"
                  key={"li-" + key}
                  data-aos="zoom-in-down"
                >
                  <img
                    className="rounded-t w-full h-[220px] object-cover"
                    src={`data:image/jpg;base64,${item.image_string}`}
                  />
                  <div className="flex flex-col px-8 pb-8 h-fit space-y-3">
                    <h1 className="text-blue-700 text-2xl font-semibold w-fit">
                      {item.title}
                    </h1>
                    <p className="text-slate-500 text-justify text-md">
                      {item.contents}
                    </p>
                  </div>
                </li>
              );
            })
          : null}
      </ul>
    </div>
  );
};

export default Card;
