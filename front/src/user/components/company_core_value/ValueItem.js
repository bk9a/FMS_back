import React, { useEffect } from "react";
import background from "../../../assets/img/background-black.jpg";
import AOS from "aos";
import "aos/dist/aos.css";

const ValueItem = (props) => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);
  return (
    <div data-aos="zoom-in" className="group relative w-full h-full">
      <div className="absolute w-full h-full flex justify-center items-center">
        <p className="text-white select-none uppercase text-sm text-center tablet:text-md laptop:text-lg tablet:font-semibold group-hover:text-sky-500 duration-200">
          {props.txt}
        </p>
      </div>
      <img className="rounded" src={background} />
    </div>
  );
};

export default ValueItem;
