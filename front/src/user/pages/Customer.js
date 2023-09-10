import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import Spinner from "../components/Spinner";
import LogoSlide from "../components/LogoSlide";
import { useLocation } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";

const Customer = () => {
  // const len = LogoStore.length / 2;
  const [data, setData] = useState([]);
  const history = useLocation();

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios
      .get(`${process.env.REACT_APP_API}/customer?limit=30`)
      .then((response) => {
        // const loadNews = Object.entries(response.data);
        const res = response.data.data;
        setData(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const settings1 = {
    dots: false,
    infinite: true,
    arrows: false,
    autoplay: true,
    speed: 5000,
    slidesToShow: 4,
    slidesToScroll: 1,
    adaptiveHeight: true,
    pauseOnHover: true,
    autoplaySpeed: 50,
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
        },
      },
    ],
  };
  const settings2 = {
    ...settings1,
    rtl: false,
  };

  const getTemp = ({ custData, part }) => {
    let template;
    if (custData && custData.length > 0) {
      let tempData;
      if (part === 1) {
        tempData = custData.filter(
          (item, index) => index <= custData.length / 2
        );
      } else {
        tempData = custData.filter(
          (item, index) => index > custData.length / 2
        );
      }
      template = tempData.map(function (item, index) {
        const alt = item.cutomer_name;
        const image = item.image_string;

        return (
          <div key={index}>
            <LogoSlide alt={alt} image={image} />
          </div>
        );
      });
      return template;
    } else {
      return (template = <Spinner />);
    }
  };

  return (
    <div className="min-h-[550px] laptop:min-h-[900px] ">
      <Header page="customer" />
      <Breadcrumb history={history.pathname.split("/")} />
      <div className="container">
        <Slider {...settings1}>{getTemp({ custData: data, part: 1 })}</Slider>
        <hr className="h-0.5 bg-gray-400" />
        <Slider {...settings2}>{getTemp({ custData: data, part: 2 })}</Slider>
      </div>
    </div>
  );
};

export default Customer;
