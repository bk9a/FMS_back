import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";
import Pagination from "../Pagination";
import nophoto from "../../../assets/img/no-pictures1.png";

const InitialData = {
  loading: false,
  data: [],
};

const FilterContents = (props) => {
  const [content, setContent] = useState(InitialData);
  const [pagin, setPagin] = useState({});
  let [pageNum, setPage] = useState(1); // хуудасны дугаарлалтыг хадаглах state
  const [limit, setLimit] = useState(8); // нэг хуудасанд хэдэн элемент байхыг хадаглах state

  useEffect(() => {
    // filter-ийн төрөл эсвэл хуудасын дугаар өөрчлөгдсөн учир getData функцийг дахин дуудаж байна.
    getData({ page: props.pageId, type: props.field.id });
  }, [props.field.id, pageNum]);

  useEffect(() => {
    // filter-ийн төрөл өөрчлөгдсөн уучир хуудасны дугаарлалтыг 1 болгох үйлдэл
    setPage(1);
  }, [props.field.id]);

  const getData = async ({ page, type }) => {
    let res;
    setContent({ loading: true });
    await axios
      .get(
        `${process.env.REACT_APP_API}/filter-data?page_id=${page}&type_id=${type}&page=${pageNum}&limit=${limit}&ismain=true`
      )
      .then((response) => {
        res = response.data.data;
        const pagination = response.data.pagination;
        setPagin(pagination);
        setContent({ data: res, loading: false });
      })
      .catch((err) => {
        setContent(InitialData);
        console.log(err.message);
      });
  };

  // хуудасын дараагийн өгөгдлийг дуудах хэсэг "pagination"
  const next = () => {
    if (pageNum < pagin.pageCount) {
      setPage(++pageNum);
    }
  };

  // хуудасын өмнөх өгөгдлийг дуудах хэсэг "pagination"
  const prev = () => {
    if (pageNum > 1) {
      setPage(--pageNum);
    }
  };

  return (
    <div className="w-full flex flex-col items-center space-y-4">
      <ul className="relative grid grid-cols-1 justify-items-center tablet:grid-cols-2 laptop:grid-cols-3 desktop:grid-cols-4 gap-4 tablet:gap-7 laptop:gap-8 w-full  bg-white drop-shadow-md p-4 tablet:p-8 rounded-md min-h-[355px] mb-3">
        {content && content.data && content.data.length > 0 ? (
          content.data.map((item, key) => {
            let img = null;
            item.images.forEach((image) => {
              if (image.is_main_image === true) {
                img = image;
              }
            });
            return (
              <li
                className="animate-fade w-72 tablet:w-64 bg-white drop-shadow-md h-[280px]"
                key={"li-" + key}
              >
                <Link to={`/user/${props.mpage}/filter/${item.id}`}>
                  {img ? (
                    <img
                      className="w-72 h-[150px] object-cover"
                      src={`data:image/jpg;base64,${img.image_string}`}
                    />
                  ) : (
                    <img
                      className="w-72 h-[150px] object-contain"
                      src={nophoto}
                    />
                  )}
                </Link>
                <div className="relative flex flex-col p-5 border-b-2 border-blue-500 h-[130px] space-y-2">
                  <h3 className="text-[10px] text-gray-400 uppercase">
                    {item.filter_type.type_name}
                  </h3>
                  <Link to={`/user/${props.mpage}/filter/${item.id}`}>
                    <h1 className="text-[16px] font-semibold text-gray-700 uppercase">
                      {item.title.length > 60
                        ? `${item.title.slice(0, 60)}...`
                        : item.title}
                    </h1>
                  </Link>

                  {/* <p className="text-[14px] text-slate-700">{`${item.contents.slice(
                    0,
                    50
                  )}...`}</p> */}
                  {/* <Link
                    className="absolute uppercase text-md text-blue-500 bottom-4"
                    to={`/user/filter/${item.id}`}
                  >
                    Read more
                  </Link> */}
                </div>
              </li>
            );
          })
        ) : (
          <Spinner style="absolute" />
        )}
      </ul>
      {pagin && pagin.pageCount && (
        <Pagination
          page={pageNum}
          total={pagin.pageCount}
          next={next}
          prev={prev}
        />
      )}
    </div>
  );
};

export default FilterContents;
