import { Carousel } from "react-responsive-carousel";
import HeaderItem from "./CarouselItem";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Icon from "../../Icon";
import { MdNavigateNext } from "react-icons/md";
import React, { useEffect, useState } from "react";
import axios from "axios";

const initialData = {
  data: [],
  loading: false,
};

const HomeSlider = () => {
  const [state, setState] = useState(initialData);
  const arrowStyle =
    "absolute inset-y-0 flex w-20 items-center justify-center opacity-30 cursor-pointer select-none z-20 hover:opacity-100 hover:bg-black/10 duration-100 delay-10";
  const arrowPrev = "left-0 rotate-180 ";
  const arrowNext = "right-0";

  useEffect(() => {
    let isMounted = true;
    getData(isMounted);
    return () => {
      isMounted = false;
    };
  }, []);

  const getData = (isMounted) => {
    setState({ loading: true });
    axios
      .get(`${process.env.REACT_APP_API}/home-slider`)
      .then((response) => {
        // const loadNews = Object.entries(response.data);
        const res = response.data.data;
        if (isMounted) setState({ data: res, loading: false });
      })
      .catch((err) => {
        console.log(err);
      });
    return;
  };

  return (
    <Carousel
      infiniteLoop={true}
      showArrows={true}
      autoPlay={true}
      showStatus={false}
      interval="5000"
      showThumbs={false}
      renderArrowPrev={(onClickHandler) => (
        <div onClick={onClickHandler} className={`${arrowStyle} ${arrowPrev}`}>
          <Icon color="white" size="130" iconn={<MdNavigateNext />} />
        </div>
      )}
      renderArrowNext={(onClickHandler) => (
        <div onClick={onClickHandler} className={`${arrowStyle} ${arrowNext}`}>
          <Icon color="white" size="130" iconn={<MdNavigateNext />} />
        </div>
      )}
    >
      {state &&
        state.data &&
        state.data.length > 0 &&
        state.data.map((item, key) => {
          return <HeaderItem item={item} key={"Item-" + key} />;
        })}
    </Carousel>
  );
};

export default HomeSlider;
