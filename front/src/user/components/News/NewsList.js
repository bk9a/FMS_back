import React, { useState, useEffect } from "react";
import Header from "../Header";
import axios from "axios";
import { Link } from "react-router-dom";
import Spinner from "../Spinner";
import nophoto from "../../../assets/img/no-pictures1.png";
import Pagination from "../Pagination";
import { useLocation } from "react-router-dom";
import Breadcrumb from "../Breadcrumb";

const initialData = {
  data: [],
  loading: false,
};

const NewsList = () => {
  const [content, setContent] = useState(initialData);
  const [pagin, setPagin] = useState({});
  let [pageNum, setPage] = useState(1);
  const [limit, setLimit] = useState(12);
  const history = useLocation();

  useEffect(() => {
    getData();
  }, [pageNum]);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    setContent({ loading: true });
    axios
      .get(
        `${process.env.REACT_APP_API}/news?ismain=true&page=${pageNum}&limit=${limit}`
      )
      .then((response) => {
        // const loadNews = Object.entries(response.data);
        const res = response.data.data;
        setContent({ data: res, loading: false });
        const pagination = response.data.pagination;
        setPagin(pagination);
      })
      .catch((err) => {
        setContent(initialData);
        console.log(err);
      });
  };

  // хуудасын дугаарыг 1-ээр нэмэгдүүлэх
  const next = () => {
    if (pageNum < pagin.pageCount) {
      setPage(++pageNum);
    }
  };

  // хуудасын дугаарыг 1-ээр буруулах
  const prev = () => {
    if (pageNum > 1) {
      setPage(--pageNum);
    }
  };

  return (
    <div className="min-h-screen w-full">
      <Header page="news" min />
      <Breadcrumb history={history.pathname.split("/")} />
      <div className="container my-8">
        <ul className="relative grid tablet:grid-cols-2 laptop:grid-cols-3 desktop:grid-cols-4 gap-x-16 gap-y-10 justify-items-stretch w-full drop-shadow-md rounded-md min-h-[355px] mb-8">
          {content && content.data && content.data.length > 0 ? (
            content.data.map((item, key) => {
              let img = null;
              item.images.forEach((image) => {
                if (image.isMainImage === true) {
                  img = image;
                }
              });
              return (
                <li
                  className="animate-fade w-full bg-white h-[340px] tablet:h-[280px]"
                  key={"li-" + key}
                >
                  <Link to={`/user/news/${item.id}`}>
                    {img ? (
                      <img
                        className="w-full h-[210px] tablet:h-[150px] object-cover"
                        src={`data:image/jpg;base64,${img.imageString}`}
                      />
                    ) : (
                      <img
                        className="w-full h-[210px] tablet:h-[150px] object-contain"
                        src={nophoto}
                      />
                    )}
                  </Link>
                  <div className="relative flex flex-col p-5 border-b-2 border-blue-500 h-[130px] tablet:h-[130px] space-y-2">
                    <Link to={`/user/news/${item.id}`}>
                      <h1 className="text-[16px] font-semibold text-gray-700 uppercase">
                        {item.title.length > 60
                          ? `${item.title.slice(0, 60)}...`
                          : item.title}
                      </h1>
                    </Link>
                  </div>
                </li>
              );
            })
          ) : (
            <Spinner style="absolute left-1/2" />
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
    </div>
  );
};

export default NewsList;
