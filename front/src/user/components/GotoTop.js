import React, { useEffect, useState } from "react";
import { HiChevronRight } from "react-icons/hi";
import Icon from "./Icon";

const GotoTop = () => {
  const [scrollBack, setScrollBack] = useState(false);

  const toggleScrollback = () => {
    if (window.pageYOffset > 100) {
      setScrollBack(true);
    } else {
      setScrollBack(false);
    }
  };
  const scrolltoTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleScrollback);
    return () => {
      window.removeEventListener("scroll", toggleScrollback);
    };
  }, []);

  return (
    <div className="fixed bottom-6 right-10 ">
      <button
        className={`${
          scrollBack ? "block" : "hidden"
        } -rotate-90 bg-blue-500 rounded-full bg-clip-content p-1 hover:border-2 border-blue-600 hover:bg-blue-600 duration-100`}
        onClick={scrolltoTop}
      >
        <Icon size="40" color="white" iconn={<HiChevronRight />} />
      </button>
    </div>
  );
};

export default GotoTop;
