import React, { useEffect, useState } from "react";
import { NewsCols } from "./NewsCols";
import TableTemp from "../../TableTemp";
import axios from "axios";
import Button from "../../Button";
import { Link } from "react-router-dom";

const IntialData = {
  news: [],
  loading: false,
};

const AdminNews = () => {
  const [data, setData] = useState(IntialData);
  let [pageNum, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [pagin, setPagin] = useState({});

  useEffect(() => {
    getData();
  }, [pageNum]);

  useEffect(() => {
    setPage(1);
  }, []);

  const GetToken = function () {
    return localStorage.getItem("ITSToken");
  };

  const getData = async () => {
    setData({ loading: false });
    await axios
      .get(`${process.env.REACT_APP_API}/news?page=${pageNum}&limit=${limit}`, {
        headers: { authorization: "Bearer " + GetToken() },
      })
      .then((response) => {
        // const loadNews = Object.entries(response.data.data.data);
        let res = response.data.data;
        setData({ news: res, loading: false });
        setPagin(response.data.pagination);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const next = () => {
    if (pageNum < pagin.pageCount) {
      setPage(++pageNum);
    }
  };
  const prev = () => {
    if (pageNum > 1) {
      setPage(--pageNum);
    }
  };

  return (
    <div className="pt-4 space-y-4">
      <Link className="pl-4 inline-block relative" to="/admin/addnews">
        <Button name="Мэдээ оруулах" />
      </Link>
      {data && data.news && data.news.length > 0 ? (
        <>
          <TableTemp
            Cols={NewsCols}
            Data={data.news}
            getData={getData}
            next={next}
            prev={prev}
            pagination={pagin}
            page={pageNum}
          />
        </>
      ) : (
        <p className="pl-4 flex justify-start items-center text-sky-600 text-2xl">
          Түр хүлээнэ үү!
        </p>
      )}
    </div>
  );
};

export default AdminNews;
