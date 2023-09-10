import React, { useEffect, useState } from "react";
import axios from "axios";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { FcAddImage } from "react-icons/fc";
import Icon from "../../user/components/Icon";
import Button from "./Button";
import { TiDelete } from "react-icons/ti";
import ImageUpload from "./ImageUpload";
import { useNavigate, useParams } from "react-router";
import htmlToDraft from "html-to-draftjs";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useAlert } from "react-alert";
import { useAuth } from "../context/auth";

const CreateArticle = (props) => {
  const [editorState, setEditorState] = useState(null);
  const [showImage, setShowImage] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [newImage, setNewImage] = useState(false);
  const [selectedOtherImages, setSelectedOtherImages] = useState([]);
  const [OtherImages, setOtherImages] = useState([]);
  const [deletedImages, setDeletedImages] = useState([]);
  const [showError, setError] = useState(false);
  const [oversizeError, setOversizeError] = useState(false);
  const [otherOversize, setOtherOversize] = useState(false);
  const [filterTypes, setFilterTypes] = useState({
    types: [{ name: "" }],
    page: "",
  });
  const alert = useAlert();
  let navigate = useNavigate();

  const data = props.type;
  const [title, setTitle] = useState(undefined);
  const onEditorStateChange = (es) => {
    setEditorState(es);
  };
  const { LogOut } = useAuth();

  let { id } = useParams();

  useEffect(() => {
    if (id) {
      getDataById(id);
    }
    setOtherOversize(false);
    setOversizeError(false);
  }, []);

  useEffect(() => {
    setTitle(undefined);
    const newEditorState = EditorState.createEmpty();
    setEditorState(newEditorState);
    setSelectedImage(null);
    setNewImage(false);
    setOtherImages([]);
    setShowImage(false);
    setOtherOversize(false);
  }, [id]);

  // server-ees өгөгдсөн id-тай тохирох датаг авж байна
  const getDataById = async (id) => {
    await axios
      .get(`${process.env.REACT_APP_API}/news/${id}`, {
        headers: {
          authorization: "Bearer " + localStorage.getItem("ITSToken"),
        },
      })
      .then((response) => {
        // const loadNews = Object.entries(response.data.data.data);
        let res = response.data.data;
        let image1 = null;
        image1 = res.images.filter((image) => image.isMainImage === true)[0];
        if (image1 !== null && image1 !== undefined) {
          setShowImage(true);
          setSelectedImage(image1);
        }
        setOtherImages(
          res.images.filter((image) => image.isMainImage === false)
        );
        setTitle(res.title);

        const contentBlock = htmlToDraft(res.news_content);
        if (contentBlock) {
          const contentState = ContentState.createFromBlockArray(
            contentBlock.contentBlocks
          );
          const newEditorState = EditorState.createWithContent(contentState);
          setEditorState(newEditorState);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  // оруулас өгөгдлийг server лүү илгээх
  const sendData = async () => {
    // хэрэв id байвал update хийгдэнэ, байхгүй бол шинээр үүсгэнэ.
    if (id) {
      const formData = new FormData();
      let myJSON;

      if (selectedImage !== null && title !== null) {
        if (newImage) {
          formData.append("MainImage", selectedImage);
        }

        formData.append("title", title);

        myJSON = JSON.stringify(deletedImages);
        formData.append("deletredImages", myJSON);
        formData.append(
          "news_content",
          draftToHtml(convertToRaw(editorState.getCurrentContent()))
        );
      } else {
        setError(true);
        return;
      }

      // console.log({ selectedImage, selectedOtherImages });

      for (var i = 0; i < selectedOtherImages.length; i++) {
        formData.append("file_" + i, selectedOtherImages[i]);
      }
      await axios
        .put(`${process.env.REACT_APP_API}/news/${id}`, formData, {
          headers: {
            authorization: "Bearer " + localStorage.getItem("ITSToken"), //токенийг headers рүү оруулж өгж байна.
          },
        })
        .then((response) => {
          if (response.data.success === true) {
            alert.success("Мэдээ амжилттай хадгалагдлаа!", {
              closeCopy: "Хаах",
              onClose: () => {
                navigate(`/admin`);
              },
            });
          } else {
            alert.success("Хугацаа дууссан байна! Та дахин нэвтэрнэ үү!", {
              closeCopy: "Хаах",
              onOpen: () => {
                navigate(`/admin`);
              },
              onClose: () => {
                LogOut();
              },
            });
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
    } else {
      const formData = new FormData();
      let myJSON;
      if (selectedImage !== null && title !== null) {
        if (newImage) {
          formData.append("MainImage", selectedImage);
        }

        formData.append("title", title);

        myJSON = JSON.stringify(deletedImages);
        formData.append("deletredImages", myJSON);
        formData.append(
          "news_content",
          draftToHtml(convertToRaw(editorState.getCurrentContent()))
        );
      } else {
        setError(true);
        return;
      }

      // console.log({ selectedImage, selectedOtherImages });

      for (var i = 0; i < selectedOtherImages.length; i++) {
        formData.append("file_" + i, selectedOtherImages[i]);
      }
      await axios
        .post(`${process.env.REACT_APP_API}/news`, formData, {
          headers: {
            authorization: "Bearer " + localStorage.getItem("ITSToken"),
          },
        })
        .then((response) => {
          if (response.data.success === true) {
            alert.success("Мэдээ амжилттай хадгалагдлаа!", {
              closeCopy: "Хаах",
              onClose: () => {
                navigate(`/admin`);
              },
            });
          } else {
            alert.success("Хугацаа дууссан байна! Та дахин нэвтэрнэ үү!", {
              closeCopy: "Хаах",
              onOpen: () => {
                navigate(`/admin`);
              },
              onClose: () => {
                LogOut();
              },
            });
          }
        })
        .catch((err) => {
          console.log(err);
          // alert.error(err.message);
        });
    }
  };
  // бусад зургуудыг state рүү оруулах
  const OtherImagesChange = (e) => {
    let a = false;
    setOtherOversize(false);
    if (e.target.files) {
      const fileArray = Array.from(e.target.files).map((file) => file);
      fileArray.map((file) => {
        // оруулсан зургуудын хэмжээ 1mb-гээс хэтэрсэн эсэхийг шалгаж байна
        if (file.size >= 1000000) {
          setOtherOversize(true);
          a = true;
        }
      });
      if (!a) {
        setSelectedOtherImages((prevImages) => prevImages.concat(fileArray));
      }
    }
  };

  // бусад зургуудыг үзүүлэх
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
            clicked={() => {
              setOtherOversize(false);
              setSelectedOtherImages(
                selectedOtherImages.filter((e) => e !== photo)
              );
            }}
          />
        </div>
      );
    });
  };

  // main зургыг өөрчлөх
  const imageChange = (e) => {
    setOversizeError(false);
    if (e.target.files && e.target.files.length > 0) {
      // оруулсан зургуудын хэмжээ 1mb-гээс хэтэрсэн эсэхийг шалгаж байна
      if (e.target.files[0].size <= 1000000) {
        setSelectedImage(e.target.files[0]);
        setNewImage(true);
        setShowImage((previous) => !previous);
      } else {
        setOversizeError(true);
      }
    }
  };

  // main зургыг устгах
  const removeSelectedImage = () => {
    setSelectedImage(null);
    setNewImage(true);
    setShowImage((previous) => !previous);
    setDeletedImages(deletedImages.concat(selectedImage)); //main зураг устгагдсан гэдгийг сэрвэр лүү илгээхийн тулд deletedImages state рүү усгасан зургыг хийж байна
    setOversizeError(false);
  };

  const selectOnChange = (e) => {
    setFilterTypes(data.filter((item) => e.target.value === item.page)[0]);
  };

  // мэдээний мэдээллийг шинчилж байх үед шинэ зургуудыг үзүүлэх
  const renderPhotos1 = (source) => {
    return source.map((photo, key) => {
      return (
        <div
          className="relative tablet:w-[250px]  tablet:h-[200px] mr-3 mb-3"
          key={key}
        >
          <img
            className="w-full h-full object-cover"
            src={`data:image/jpg;base64,${photo.imageString}`}
          />
          <Icon
            color="red"
            styles="absolute top-0 right-0 cursor-pointer hover:scale-105 duration-200"
            size="35"
            iconn={<TiDelete />}
            clicked={() => {
              setOtherImages(OtherImages.filter((e) => e !== photo));
              setDeletedImages(deletedImages.concat(photo));
            }}
          />
        </div>
      );
    });
  };

  return (
    <div className="flex flex-col h-full rounded-md p-8 space-y-6">
      <div className="space-y-1">
        <label className="font-semibold text-lg text-slate-700">
          Гарчиг <span className="text-red-500">*</span>
        </label>
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
      {data && (
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
              {data.map((item, key) => (
                <option key={"option1-" + key} value={item.page}>
                  {item.page}
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
            >
              {filterTypes.types.map((item, key) => (
                <option key={"option2-" + key} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        </>
      )}
      <div className="space-y-1">
        <label className="font-semibold text-lg text-slate-700">Зураг</label>
        {oversizeError && (
          <p className="text-red-500">
            <span className="text-red-500">*</span>
            зургийн хэмжээ 1MB-ээс хэтэрсэн байна!
          </p>
        )}
        <div className="w-full tablet:w-[500px] h-[300px] bg-slate-100 rounded flex items-center justify-center">
          {!showImage ? (
            <ImageUpload
              id="mainImage"
              styles="rounded w-fit h-fit border-2 border-slate-400"
              labelStyle="h-20 cursor-pointer flex items-center justify-start px-6 space-x-2 text-slate-400 font-semibold"
              iconnSize="50"
              iconn={<FcAddImage />}
              txt="Зураг оруулах"
              imagesChange={imageChange}
            />
          ) : (
            <div className="relative">
              <img
                className="w-[500px] h-[300px] object-cover"
                src={
                  id
                    ? newImage
                      ? URL.createObjectURL(selectedImage)
                      : selectedImage &&
                        selectedImage.imageString &&
                        `data:image/jpg;base64,${selectedImage.imageString}`
                    : URL.createObjectURL(selectedImage)
                }
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
          editorClassName="px-8 text-lg bg-slate-100 text-slate-800"
          onEditorStateChange={onEditorStateChange}
          placeholder="Write text..."
        />
      </div>
      <div className="space-y-3">
        <label className="font-semibold text-lg text-slate-700">
          Бусад зургууд
        </label>
        <ImageUpload
          id="otherImages"
          iconnSize="30"
          iconnColor="white"
          styles="rounded-full w-fit h-fit bg-blue-400"
          labelStyle="h-12 w-fit cursor-pointer flex items-center justify-start px-6 space-x-2 text-white text-sm"
          txt="Бусад зургууд"
          multiple
          imagesChange={OtherImagesChange}
          iconn={<FaCloudUploadAlt />}
          onClick={() => {
            setOtherOversize(false);
          }}
        />
      </div>
      <div className="w-full flex flex-wrap">
        {renderPhotos(selectedOtherImages)}
        {id ? renderPhotos1(OtherImages) : null}
      </div>
      {showError && (
        <p>
          <span className="text-red-500">*</span> тэмдэглэсэн талбаруудын
          мэдээллийг бүрэн оруулна уу!
        </p>
      )}
      {otherOversize && (
        <p className="text-red-500">
          <span>*</span> зургийн хэмжээ 1MB-ээс хэтэрсэн байна!
        </p>
      )}
      <Button
        name="Хадгалах"
        iconSize="20"
        iconColor="white"
        onClick={() => sendData()}
      />
    </div>
  );
};

export default CreateArticle;
