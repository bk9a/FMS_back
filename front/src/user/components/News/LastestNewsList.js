import React, { useState, useEffect } from "react";
import ListItem from "./ListItem";
import axios from "axios";

const LastestNewsList = (props) => {
  const [news, setNews] = useState([]);
  const showNewsNum = 5;

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    await axios
      .get(`${process.env.REACT_APP_API}/news/${showNewsNum}/lastnews`)
      .then((response) => {
        let res = response.data.data;
        setNews(res);
      })
      .catch((err) => {
        setNews(null);
        console.log(err);
      });
  };

  return (
    <div className="w-full laptop:w-[390px] flex flex-col mt-2 divide-y-1 my-4">
      <div className="w-full rounded-t-md flex justify-center items-center bg-gradient-to-r from-sky-500 to-indigo-500 text-white h-10">
        Мэдээ
      </div>
      <div className="w-full divide-y divide-dashed divide-gray-400 h-[560px] overflow-y-auto overflow-x-hidden">
        {news &&
          news.map((item, key) => {
            return (
              <ListItem
                LinkTo={`/user/news/${item.id}`}
                key={key}
                title={item.title}
                img={item.images[0]}
                date={item.date}
                id={item.id}
                showId={props.showId}
              />
            );
          })}
      </div>
    </div>
  );
};

export default LastestNewsList;
