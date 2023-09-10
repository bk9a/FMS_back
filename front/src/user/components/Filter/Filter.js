import React, { useEffect, useState } from "react";
import FilterContents from "./FilterContents";
import axios from "axios";

const InitialData = {
  loading: false,
  data: null,
  pageId: null,
};

const Filter = (props) => {
  const [field, setField] = useState({ id: 0 });
  const [fields, setFields] = useState(InitialData);

  const itemStyle =
    "flex justify-center box-border border-b-2 border-white items-center py-4 w-full h-full cursor-pointer select-none text-center bg-white text-xs tablet:text-sm laptop:text-sm";
  const activeStyle =
    "text-blue-700 font-semibold bg-blue-100 hover:bg-blue-100 border-blue-700 hover:border-blue-700 duration-100";
  const notActiveStyle =
    "hover:bg-slate-200 hover:border-slate-200 duration-100";

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setFields({ loading: true });
    await axios
      .get(`${process.env.REACT_APP_API}/filter-type/?page_name=${props.page}`)
      .then((response) => {
        let res = response.data.data;
        setFields({ data: res, loading: false, pageId: res[0].page_id });
      })
      .catch((err) => {
        setFields(InitialData);
        console.log(err.message);
      });
  };

  return (
    <div className="my-8 h-fit w-full flex flex-col items-center justify-center space-y-6">
      <div className="flex items-center text-gray-600 w-full tablet:w-full h-12 drop-shadow-md uppercase">
        <div
          className={`${itemStyle} ${
            0 === field.id ? activeStyle : notActiveStyle
          }`}
          onClick={() => {
            setField({ id: 0 });
          }}
        >
          <h1 className="pt-1">БҮГД</h1>
        </div>
        {fields.data && fields.data.length > 0
          ? fields.data.map((item, key) => {
              // filter-ийн төрлүүдийг харуулах хэсэг
              return (
                <div
                  className={`${itemStyle} ${
                    item.id === field.id ? activeStyle : notActiveStyle
                  }`}
                  key={"card-" + key}
                  onClick={() => {
                    setField(item);
                  }}
                >
                  <h1 className="pt-1">{item.type_name}</h1>
                </div>
              );
            })
          : null}
      </div>
      {field && fields.data ? (
        // filter-ийн контентүүдийг харуулах хэсэг
        <FilterContents
          pageId={fields.pageId}
          field={field}
          mpage={props.page}
        />
      ) : null}
    </div>
  );
};

export default Filter;
