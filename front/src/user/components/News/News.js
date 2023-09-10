import React, { useEffect, useState, useCallback } from "react";
import img2 from "../../../assets/img/no-pictures1.png";
import Icon from "../Icon";
import { useParams } from "react-router-dom";
import LastestNewsList from "./LastestNewsList";
import { MdDateRange } from "react-icons/md";
import Header from "../Header";
import axios from "axios";
import Spinner from "../Spinner";
import OtherImages from "../OtherImages";
import ImageViewer from "react-simple-image-viewer";
import { useLocation } from "react-router-dom";
import Breadcrumb from "../Breadcrumb";

const InitialData = {
  news: [],
  loading: false,
};

const News = (props) => {
  let { id } = useParams();
  const [data, setData] = useState(InitialData);
  const [mainImage, setMainImage] = useState(null);
  const [otherImage, setOtherImage] = useState([]);
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const history = useLocation();

  useEffect(() => {
    getData();
    setOtherImage([]);
  }, [id]);

  // бусад зургууд дарагдахад томруулж харуулах функц
  const openImageViewer = useCallback((index) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  // бусад зургууд дарагдахад томруулж харуулах функц
  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

  const getData = async () => {
    setData({ loading: true });
    await axios
      .get(`${process.env.REACT_APP_API}/news/${id}`)
      .then((response) => {
        let res = response.data.data;
        res.images.forEach((image) => {
          if (image.isMainImage === true) {
            setMainImage(image);
          } else {
            setOtherImage((prev) =>
              prev.concat(`data:image/jpg;base64,${image.imageString}`)
            );
          }
        });
        setData({ news: res, loading: false });
      })
      .catch((err) => {
        setData(InitialData);
        console.log(err.message);
      });
  };

  return (
    <div className="min-h-screen">
      <Header page="news" min />
      <Breadcrumb history={history.pathname.split("/").slice(0, -1)} />
      <div className="container w-full flex flex-col mt-5 laptop:flex-row">
        <div className="w-full laptop:mr-8 space-y-4 mb-7 text-lg">
          {data.loading ? (
            <Spinner />
          ) : (
            <React.Fragment>
              <h1 className="text-gray-800 text-2xl font-semibold border-b-2 border-blue-500 pb-2 mb-2 w-full">
                {data.news.title ? data.news.title : "can't get title"}
              </h1>
              <div className="flex justify-end items-center mb-4">
                <Icon size="17" iconn={<MdDateRange />} />
                <h2 className="ml-2 text-sm text-gray-500 text-right">
                  {data.news.date}
                </h2>
              </div>
              <div className="w-full flex justify-center">
                <img
                  className="w-full h-[300px] tablet:h-[400px] laptop:h-[500px] object-cover"
                  src={
                    mainImage
                      ? `data:image/jpg;base64,${mainImage.imageString}`
                      : img2
                  }
                />
              </div>
              <div
                className="text-black text-justify space-y-4"
                dangerouslySetInnerHTML={{ __html: data.news.news_content }}
              ></div>
              {otherImage && otherImage.length > 0 && (
                <OtherImages
                  images={otherImage}
                  openImageViewer={openImageViewer}
                />
              )}
            </React.Fragment>
          )}
          {otherImage && otherImage.length > 0 && (
            <div className="z-50">
              {isViewerOpen && (
                <ImageViewer
                  src={otherImage}
                  currentIndex={currentImage}
                  onClose={closeImageViewer}
                  disableScroll={false}
                  backgroundStyle={{
                    backgroundColor: "rgba(0,0,0,0.9)",
                  }}
                  closeOnClickOutside={true}
                />
              )}
            </div>
          )}
        </div>
        <LastestNewsList />
        {otherImage && otherImage.length > 0 && (
          <div className="z-50">
            {isViewerOpen && (
              <ImageViewer
                src={otherImage}
                currentIndex={currentImage}
                onClose={closeImageViewer}
                disableScroll={false}
                backgroundStyle={{
                  backgroundColor: "rgba(0,0,0,0.9)",
                }}
                closeOnClickOutside={true}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default News;
