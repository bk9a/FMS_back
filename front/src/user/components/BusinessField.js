import React, { useEffect, useState } from "react";
import Icon from "./Icon";
import { GoPrimitiveDot } from "react-icons/go";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";

// ul className="flex justify-between mt-4"
// li className="flex w-[450px] border-0 rounded-md p-4 bg-white drop-shadow-lg hover:drop-shadow-md hover:-translate-y-2 duration-300"
// div className="mr-3 p-2 border-4 rounded-full border-slate-300 h-fit"
const InitialData = {
  data: [],
  loading: false,
};

const BusinessField = () => {
  const [state, setState] = useState(InitialData);

  useEffect(() => {
    AOS.init({ duration: 1000 });
    getData();
  }, []);

  const getData = async () => {
    setState({ loading: true });
    await axios
      .get(`${process.env.REACT_APP_API}/business-field`)
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
    <div className="flex flex-col text-justify w-full">
      <h1 className="text-3xl font-semibold text-black text-center mb-1 font-firaSans">
        Бизнесийн үндсэн чиглэл
      </h1>
      <div className="flex items-center justify-center">
        <hr className="bg-blue-500 h-1 w-1/2" />
        <Icon size="30" color="2563eb" iconn={<GoPrimitiveDot />} />
        <hr className="bg-blue-500 h-1 w-1/2" />
      </div>
      <ul className="flex flex-col laptop:flex-row laptop:justify-between laptop:mt-4 overflow-hidden p-2">
        {state &&
          state.data &&
          state.data.length > 0 &&
          state.data.map((item, key) => {
            return (
              <li
                data-aos="fade-up"
                className="flex w-full rounded-md py-4 laptop:bg-white laptop:w-[400px] laptop:p-4 laptop:rounded-md desktop:drop-shadow-md laptop:border laptop:border-white desktop:hover:drop-shadow-md desktop:hover:-translate-y-2 desktop:hover:border-sky-600 duration-300"
                key={"li-" + key}
              >
                <div className="mr-3 p-2 border-4 rounded-full border-slate-300 h-fit">
                  <img
                    className="w-36 object-cover"
                    src={`data:image/jpg;base64,${item.icon_string}`}
                  />
                </div>
                <div>
                  <h1 className="text-lg font-semibold">{item.title}</h1>
                  <div
                    className="text-gray-500"
                    dangerouslySetInnerHTML={{ __html: item.contents }}
                  ></div>
                </div>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default BusinessField;
