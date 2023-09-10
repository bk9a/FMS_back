import React, { useEffect, useState } from "react";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";

const InitialData = {
  data: [],
  loading: false,
};

const AboutUS = () => {
  const [state, setState] = useState(InitialData);

  useEffect(() => {
    // animation
    AOS.init({ duration: 1000 });
    getData();
  }, []);

  const getData = async () => {
    setState({ loading: true });
    await axios
      .get(`${process.env.REACT_APP_API}/about-us/about-company`)
      .then((response) => {
        let res = response.data.data;
        setState({ data: res, loading: false });
      })
      .catch((err) => {
        setState(InitialData);
        console.log(err.message);
      });
  };

  return (
    <div className="flex flex-col w-full laptop:flex-row overflow-hidden">
      {state && state.data && state.data.image_string && (
        <img
          data-aos="fade-right"
          className="w-full pb-5 object-cover laptop:w-1/2 laptop:pr-5 laptop:pb-0 laptop:h-[410px] "
          src={`data:image/jpg;base64,${state.data.image_string}`}
        />
      )}
      <div
        data-aos="fade-left"
        className="flex flex-col w-full laptop:w-1/2 laptop:pl-5"
      >
        {state && state.data && state.data.title && (
          <h1 className="text-2xl font-semibold border-b-4 border-blue-500 w-full tablet:w-fit">
            {state.data.title}
          </h1>
        )}
        {state && state.data && state.data.contents && (
          <div
            className="text-gray-500 pt-2 text-justify text-xl leading-8 laptop:leading-loose"
            dangerouslySetInnerHTML={{ __html: state.data.contents }}
          ></div>
        )}
      </div>
    </div>
  );
};

export default AboutUS;
