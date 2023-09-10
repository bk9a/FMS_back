import React, { useState, useEffect } from "react";
import axios from "axios";

const InitialData = {
  data: [],
  loading: false,
};

const Greeting = () => {
  const [state, setState] = useState(InitialData);
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setState({ loading: true });
    await axios
      .get(`${process.env.REACT_APP_API}/about-us/greeting`)
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
    <div className="flex flex-col items-center w-full text-justify">
      {state && state.data && state.data.title && (
        <h1 className="w-fit border-b-4 border-blue-500 text-3xl font-semibold mb-2">
          {state.data.title}
        </h1>
      )}
      {state && state.data && state.data.contents && (
        <div
          className="indent-8 text-gray-500 text-lg leading-loose"
          dangerouslySetInnerHTML={{ __html: state.data.contents }}
        ></div>
      )}
    </div>
  );
};

export default Greeting;
