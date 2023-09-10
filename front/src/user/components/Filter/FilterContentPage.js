import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router";
import nophoto from "../../../assets/img/no-pictures1.png";
import Header from "../../components/Header";
import axios from "axios";
import OtherImages from "../OtherImages";
import ImageViewer from "react-simple-image-viewer";
import { useLocation } from "react-router-dom";
import Breadcrumb from "../Breadcrumb";

const FilterContentPage = () => {
  let { id } = useParams();
  id = Number(id);
  const history = useLocation();
  console.log(history.pathname.split("/").slice(0, -1));

  const [data, setData] = useState({});
  const [mainImage, setMainImage] = useState(null);
  const [otherImage, setOtherImage] = useState([]);
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  useEffect(() => {
    getData();
    setOtherImage([]);
  }, []);

  const openImageViewer = useCallback((index) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

  const getData = async () => {
    await axios
      .get(`${process.env.REACT_APP_API}/filter-data/${id}`)
      .then((response) => {
        // const loadNews = Object.entries(response.data.data.data);
        let res = response.data.data;
        res.images.forEach((image) => {
          if (image.is_main_image === true) {
            setMainImage(image);
          } else {
            setOtherImage((prev) =>
              prev.concat(`data:image/jpg;base64,${image.image_string}`)
            );
          }
        });
        setData(res);
        // console.log(response);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div className="min-h-screen">
      {data && data.filter_type && (
        <Header page="filter" text={data.filter_type.type_name} min />
      )}
      <Breadcrumb history={history.pathname.split("/").slice(0, -2)} />
      <div className="flex flex-col container space-y-10 my-5 laptop:space-y-0 laptop:flex-col">
        <div className="space-y-6 w-full ">
          {data && data.title && (
            <h1 className="uppercase text-2xl font-semibold text-gray-800 border-b-2 border-blue-700 pb-2">
              {data.title}
            </h1>
          )}
          <div className="flex justify-center bg-gray-100 mb-4">
            {mainImage ? (
              <img
                className="w-full h-[300px] tablet:h-[400px] laptop:h-[500px] object-contain"
                src={`data:image/jpg;base64,${mainImage.image_string}`}
              />
            ) : (
              <img
                className="w-full h-[300px] tablet:h-[400px] laptop:h-[500px] object-contain"
                src={nophoto}
              />
            )}
          </div>
          {data && data.contents && (
            <div
              className="text-justify text-lg text-black space-y-4"
              dangerouslySetInnerHTML={{ __html: data.contents }}
            ></div>
          )}
        </div>
        {otherImage && otherImage.length > 0 && (
          <OtherImages images={otherImage} openImageViewer={openImageViewer} />
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
    </div>
  );
};

export default FilterContentPage;
