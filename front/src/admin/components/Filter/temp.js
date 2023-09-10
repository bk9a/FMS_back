import React, { useEffect, useState } from "react";
import axios from "axios";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { FcAddImage } from "react-icons/fc";
import Icon from "../../../user/components/Icon";
import Button from "../Button";
import { TiDelete } from "react-icons/ti";
import ImageUpload from "../ImageUpload";

const AddFilter1 = () => {
  const [pages, setPages] = useState("");
  const [clickedType, setClickedType] = useState("");
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [showImage, setShowImage] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedOtherImages, setSelectedOtherImages] = useState([]);
  const [filterTypes, setFilterTypes] = useState({
    types: [{ name: "" }],
    page: "",
  });

  useEffect(() => {
    getPages();
  }, []);
  // const data = props.type;
  //fields
  const [title, setTitle] = useState("");
  const onEditorStateChange = (es) => {
    setEditorState(es);
  };

  const getPages = async () => {
    await axios
      .get(`${process.env.REACT_APP_API}/filter-page`)
      .then((response) => {
        // const loadNews = Object.entries(response.data.data.data);
        let res = response.data.data;
        setPages(res);
        // console.log(response);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const sendData = async () => {
    // console.log({
    //   title: title,
    //   MainImage: selectedImage,
    //   news_content: draftToHtml(convertToRaw(editorState.getCurrentContent())),
    //   files: selectedOtherImages,
    // });
    const formData = new FormData();

    formData.append("MainImage", selectedImage);
    formData.append("title", title);
    formData.append("filter_type_id", clickedType);
    formData.append(
      "contents",
      draftToHtml(convertToRaw(editorState.getCurrentContent()))
    );

    // console.log({ selectedImage, selectedOtherImages });

    for (var i = 0; i < selectedOtherImages.length; i++) {
      formData.append("file" + i, selectedOtherImages[i]);
    }
    await axios
      .post(`${process.env.REACT_APP_API}/filter-data`, formData)
      .then((response) => {
        // const loadNews = Object.entries(response.data.data.data);
        let res = response.data.data;
        console.log(res);
        alert("amjilttai hadaglaglaa");
        // setData(res);
        // console.log(response);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const OtherImagesChange = (e) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files).map((file) => file);
      setSelectedOtherImages((prevImages) => prevImages.concat(fileArray));
    }
  };

  const renderPhotos = (source) => {
    return source.map((photo, key) => {
      return (
        <div
          className="relative tablet:w-[250px]  tablet:h-[200px] mr-3 mb-3"
          key={key}
        >
          <img
            className="w-full h-full object-cover"
            src={URL.createObjectURL(photo)}
          />
          <Icon
            color="red"
            styles="absolute top-0 right-0 cursor-pointer hover:scale-105 duration-200"
            size="35"
            iconn={<TiDelete />}
            clicked={() =>
              setSelectedOtherImages(
                selectedOtherImages.filter((e) => e !== photo)
              )
            }
          />
        </div>
      );
    });
  };

  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
      setShowImage((previous) => !previous);
    }
  };

  const removeSelectedImage = () => {
    setSelectedImage(null);
    setShowImage((previous) => !previous);
  };

  const selectOnChange = async (e) => {
    // setFilterTypes(data.filter((item) => e.target.value === item.page)[0]);
    // setFilterTypes(page.filter((item) => e.target.value === item.page)[0]);
    await axios
      .get(
        `${process.env.REACT_APP_API}/filter-type?page_name=${e.target.value}`
      )
      .then((response) => {
        // const loadNews = Object.entries(response.data.data.data);
        let res = response.data.data;
        setFilterTypes(res);
        // console.log(response);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const selectTypeOnChange = (e) => {
    setClickedType(e.target.value);
  };

  return (
    <div className="flex flex-col h-full rounded-md p-8 space-y-6">
      <div className="space-y-1">
        <label className="font-semibold text-lg text-slate-700">Гарчиг</label>
        <input
          type="text"
          placeholder="Гарчиг..."
          className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 tablet:w-[500px]"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
      </div>
      {pages && pages.length > 0 && (
        <>
          <div className="space-y-1">
            <label className="font-semibold text-lg text-slate-700">
              Хуудас
            </label>
            <select
              name="page"
              onChange={selectOnChange}
              className="text-italic text-slate-400 block bg-white w-full tablet:w-[500px] border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500"
            >
              {pages.map((item, key) => (
                <option key={"option1-" + key} value={item.page_name}>
                  {item.page_name}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-lg text-slate-700">
              Төрөл
            </label>
            <select
              className="text-italic text-slate-400 block bg-white w-full tablet:w-[500px] border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500"
              name="type"
              onChange={selectTypeOnChange}
            >
              {filterTypes &&
                filterTypes.length > 0 &&
                filterTypes.map((item, key) => (
                  <option key={"option2-" + key} value={item.id}>
                    {item.type_name}
                  </option>
                ))}
            </select>
          </div>
        </>
      )}
      <div className="space-y-1">
        <label className="font-semibold text-lg text-slate-700">Зураг</label>
        <div className="w-full tablet:w-[500px] h-[300px] bg-slate-100 rounded flex items-center justify-center">
          {!showImage && (
            <ImageUpload
              id="mainImage"
              iconn={<FcAddImage />}
              txt="Зураг оруулах"
              imagesChange={imageChange}
            />
          )}
          {showImage && (
            <div className="relative">
              <img
                className="w-[500px] h-[300px] object-cover"
                src={URL.createObjectURL(selectedImage)}
              />
              <div
                className="absolute -top-6 -right-6 cursor-pointer m-0 p-0 rounded-full opacity-70 hover:opacity-90 duration-75"
                onClick={removeSelectedImage}
              >
                <Icon size="50" color="red" iconn={<TiDelete />} />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-1 h-[500px]">
        <label className="font-semibold text-lg text-slate-700">Агуулга</label>
        <Editor
          editorState={editorState}
          wrapperClassName="h-[420px] w-full"
          editorClassName="bg-white px-8 text-lg bg-slate-100 text-slate-800"
          onEditorStateChange={onEditorStateChange}
          placeholder="Write text..."
        />
      </div>
      <div className="space-y-1">
        <label className="font-semibold text-lg text-slate-700">
          Бусад зургууд
        </label>
        <ImageUpload
          id="otherImages"
          txt="Бусад зургууд"
          multiple
          imagesChange={OtherImagesChange}
          iconn={<FcAddImage />}
        />
      </div>
      <div className="w-full flex flex-wrap">
        {renderPhotos(selectedOtherImages)}
      </div>
      <Button
        name="Хадгалах"
        iconSize="20"
        iconColor="white"
        onClick={() => sendData()}
      />
    </div>
  );
};

export default AddFilter1;
