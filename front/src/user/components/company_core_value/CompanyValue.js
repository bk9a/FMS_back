import React, { useEffect, useState } from "react";
import ValueItem from "./ValueItem";
import Icon from "../Icon";
import { GoPrimitiveDot } from "react-icons/go";
import axios from "axios";

const CompanyValue = () => {
  const [state, setState] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    await axios
      .get(`${process.env.REACT_APP_API}/company-value`)
      .then((response) => {
        let res = response.data.data;
        setState(res);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-3xl font-semibold text-center mb-1">
          Бидний үнэт зүйлс
        </h1>
        <div className="flex items-center justify-center">
          <hr className="bg-blue-500 h-1 w-1/2" />
          <Icon size="30" color="2563eb" iconn={<GoPrimitiveDot />} />
          <hr className="bg-blue-500 h-1 w-1/2" />
        </div>
      </div>

      <div className="w-full grid grid-cols-2 tablet:grid-cols-3 gap-3 tablet:gap-6 laptop:gap-12">
        {state &&
          state.length > 0 &&
          state.map((item, key) => {
            return <ValueItem key={"value-" + key} txt={item.value} />;
          })}
      </div>
    </div>
  );
};

export default CompanyValue;
