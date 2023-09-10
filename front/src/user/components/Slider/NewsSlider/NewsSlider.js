import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import Article from "./Article";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import background from "../../../../assets/img/background-3.jpg";
import axios from "axios";

import Spinner from "../../Spinner";

const initialData = {
  data: [],
  loading: false,
};

const NewsSlider = () => {
  const [state, setState] = useState(initialData);
  // const ctx = useContext(NewsContext);

  useEffect(() => {
    getData();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    arrows: false,
    autoplay: true,
    initialSlide: 0,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    adaptiveHeight: true,
    pauseOnHover: true,
    rtl: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          pauseOnHover: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          pauseOnHover: false,
          dots: false,
        },
      },
    ],
  };

  const getData = () => {
    setState({ loading: true });
    axios
      .get(`${process.env.REACT_APP_API}/news?ismain=true`)
      .then((response) => {
        // const loadNews = Object.entries(response.data);
        const res = response.data.data;
        setState({ data: res, loading: false });
      })
      .catch((err) => {
        setState(initialData);
        console.log(err);
      });
  };

  const getNewsTemp = ({ newsData }) => {
    let newsTemplate;
    if (newsData && newsData.data && newsData.data.length > 0) {
      newsTemplate = newsData.data.map(function (item, index) {
        const id = item.id;
        const title = item.title;
        const image = item.images[0];

        return (
          <div key={index}>
            <Article title={title} image={image} id={id} />
          </div>
        );
      });
      return newsTemplate;
    } else {
      return (newsTemplate = <Spinner />);
    }
  };

  return (
    <div className="relative w-full h-fit grid-flow-col bg-blue-100">
      <div className="absolute inset-0">
        <h1 className="h-8 rounded-t-md text-black text-3xl font-semibold border-b-4 border-blue-500 w-full text-center pb-10 justify-self-end">
          Мэдээ
        </h1>
        <Slider {...settings}>{getNewsTemp({ newsData: state })}</Slider>
      </div>
      <img className="h-[290px] w-full object-cover" src={background} />
    </div>
  );
};

export default NewsSlider;
