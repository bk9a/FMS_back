import React, { useEffect } from "react";
import { PageHeader } from "../../assets/store/PageHeader";
import AOS from "aos";
import "aos/dist/aos.css";

const Header = (props) => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const data = PageHeader.filter((item) => item.page === props.page)[0];
  return (
    <div className="relative hidden items-center justify-center w-full laptop:flex">
      <div className="absolute flex flex-col items-center justify-center space-y-14">
        <p className="animate-fadeTrans font-sans font-bold select-none text-white text-4xl uppercase z-20">
          {props.text ? props.text : data.text}
        </p>
        {data.pretext && (
          <p className="animate-fadeTrans font-sans font-semibold select-none text-white text-lg z-20">
            {data.pretext}
          </p>
        )}
      </div>
      <div className="absolute bg-gradient-to-r from-blue-800/60 to-indigo-800/60 w-full h-full z-10"></div>
      <img
        className={`w-full ${
          props.min ? "h-[200px]" : "h-[350px]"
        } object-cover`}
        src={data.img}
      />
    </div>
  );
};

export default Header;
