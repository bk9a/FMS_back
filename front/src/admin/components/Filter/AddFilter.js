import React, { useEffect, useState } from "react";
import axios from "axios";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { FcAddImage } from "react-icons/fc";
import Icon from "../../../user/components/Icon";
import Button from "../Button";
import { TiDelete } from "react-icons/ti";
import ImageUpload from "../ImageUpload";
import { useNavigate, useParams } from "react-router";
import htmlToDraft from "html-to-draftjs";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useAlert } from "react-alert";
import { useAuth } from "../../context/auth";

const AddFilter = () => {
  const [editorState, setEditorState] = useState(null);
  const [pages, setPages] = useState("");
  const [clickedPage, setClickedPage] = useState(undefined);
  const [clickedType, setClickedType] = useState(undefined);
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

  //react alert санг оруулж ирж байна
  const alert = useAlert();

  let navigate = useNavigate();
  const { LogOut } = useAuth();

  const [title, setTitle] = useState("");
  const onEditorStateChange = (es) => {
    setEditorState(es);
  };

  let { id } = useParams();
  useEffect(() => {
    getPages();
    // selectType();
  }, []);

  useEffect(() => {
    if (id) {
      getDataById(id);
    }
    setError(false);
  }, []);

  useEffect(() => {
    setTitle("");
    const newEditorState = EditorState.createEmpty();
    setEditorState(newEditorState);
    setSelectedImage(null);
    setNewImage(false);
    setOtherImages([]);
    setShowImage(false);
    setClickedPage(undefined);
    setClickedType(undefined);
    setOtherOversize(false);
  }, [id]);

  const getDataById = async (id) => {
    await axios
      .get(`${process.env.REACT_APP_API}/filter-data/${id}`, {
        headers: {
          authorization: "Bearer " + localStorage.getItem("ITSToken"),
        },
      })
      .then((response) => {
        let res = response.data.data;
        let image1 = null;
        image1 = res.images.filter((image) => image.is_main_image === true)[0];
        if (image1 !== null && image1 !== undefined) {
          setShowImage(true);
          setSelectedImage(image1);
        }

        setOtherImages(
          res.images.filter((image) => image.is_main_image === false)
        );
        setTitle(res.title);
        setClickedPage(res.filter_type.filter_page.id);

        selectType1({
          name: res.filter_type.filter_page.id,
        });

        setClickedType(res.filter_type.id);
        const contentBlock = htmlToDraft(res.contents);
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

  const sendData = async () => {
    if (id) {
      const formData = new FormData();

      if (newImage) {
        formData.append("MainImage", selectedImage);
      }

      formData.append("title", title);
      formData.append("filter_type_id", clickedType);

      const myJSON = JSON.stringify(deletedImages);
      formData.append("deletredImages", myJSON);
      formData.append(
        "contents",
        draftToHtml(convertToRaw(editorState.getCurrentContent()))
      );

      for (var i = 0; i < selectedOtherImages.length; i++) {
        formData.append("file_" + i, selectedOtherImages[i]);
      }
      await axios
        .put(`${process.env.REACT_APP_API}/filter-data/${id}`, formData, {
          headers: {
            authorization: "Bearer " + localStorage.getItem("ITSToken"),
          },
        })
        .then((response) => {
          if (response.data.success === true) {
            alert.success("Мэдээ амжилттай хадгалагдлаа!", {
              closeCopy: "Хаах",
              onClose: () => {
                navigate(`/admin/filter`);
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
      if (
        clickedType !== undefined &&
        clickedType !== 0 &&
        title !== "" &&
        selectedImage !== null
      ) {
        formData.append("MainImage", selectedImage);
        formData.append("title", title);

        formData.append("filter_type_id", clickedType);
        formData.append(
          "contents",
          draftToHtml(convertToRaw(editorState.getCurrentContent()))
        );
      } else {
        setError(true);
        return;
      }

      for (var i = 0; i < selectedOtherImages.length; i++) {
        formData.append("file_" + i, selectedOtherImages[i]);
      }
      await axios
        .post(`${process.env.REACT_APP_API}/filter-data`, formData, {
          headers: {
            authorization: "Bearer " + localStorage.getItem("ITSToken"),
          },
        })
        .then((response) => {
          // const loadNews = Object.entries(response.data.data.data);
          let res = response;
          if (response.data.success === true) {
            alert.success("Өгөгдөл амжилттай хадгалагдлаа!", {
              closeCopy: "Хаах",
              onClose: () => {
                navigate(`/admin/filter`);
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
          alert.error(err.message);
        });
    }
  };
  const OtherImagesChange = (e) => {
    let a = false;
    setOtherOversize(false);
    if (e.target.files) {
      const fileArray = Array.from(e.target.files).map((file) => file);
      fileArray.map((file) => {
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

  //тухайн content-ын хуудасыг авж байна
  const getPages = async () => {
    await axios
      .get(`${process.env.REACT_APP_API}/filter-page`)
      .then((response) => {
        let res = response.data.data;
        setPages(res);
      })
      .catch((err) => {
        console.log(err.message);
      });
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

  const imageChange = (e) => {
    setOversizeError(false);
    if (e.target.files && e.target.files.length > 0) {
      if (e.target.files[0].size <= 1000000) {
        setSelectedImage(e.target.files[0]);
        setNewImage(true);
        setShowImage((previous) => !previous);
      } else {
        setOversizeError(true);
      }
    }
  };

  const removeSelectedImage = () => {
    setSelectedImage(null);
    setNewImage(true);
    setShowImage((previous) => !previous);
    setDeletedImages(deletedImages.concat(selectedImage));
    setOversizeError(false);
  };

  const renderPhotos1 = (source) => {
    return source.map((photo, key) => {
      return (
        <div
          className="relative tablet:w-[250px]  tablet:h-[200px] mr-3 mb-3"
          key={key}
        >
          <img
            className="w-full h-full object-cover"
            src={`data:image/jpg;base64,${photo.image_string}`}
          />
          <Icon
            color="red"
            styles="absolute top-0 right-0 cursor-pointer hover:scale-105 duration-200"
            size="35"
            iconn={<TiDelete />}
            clicked={() => {
              setOtherImages(OtherImages.filter((e) => e !== photo));
              // let temp = deletedImages;
              // temp.push(photo);
              setDeletedImages(deletedImages.concat(photo));
            }}
          />
        </div>
      );
    });
  };

  const selectType = async (e) => {
    setClickedPage(e ? e.target.value : 0);
    await axios
      .get(
        `${process.env.REACT_APP_API}/filter-type?id=${e ? e.target.value : 0}`
      )
      .then((response) => {
        let res = response.data.data;
        setFilterTypes(res);
        setClickedType(res[0].id);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const selectType1 = async ({ name }) => {
    await axios
      .get(`${process.env.REACT_APP_API}/filter-type?id=${name}`)
      .then((response) => {
        let res = response.data.data;
        setFilterTypes(res);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  // сонгогдсон төрөлийг clickedTypes state рүү оруулж байна
  const selectTypeOnChange = (e) => {
    setClickedType(e.target.value);
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
      {pages && pages.length > 0 && (
        <>
          <div className="space-y-1">
            <label className="font-semibold text-lg text-slate-700">
              Хуудас <span className="text-red-500">*</span>
            </label>
            <select
              name="page"
              value={clickedPage}
              onChange={selectType}
              className="text-italic text-slate-400 block bg-white w-full tablet:w-[500px] border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500"
            >
              <option className="bg-slate-200">Хуудасыг сонгоно уу ?</option>

              {pages.map((item, key) => (
                <option
                  className="bg-slate-50"
                  key={"option1-" + key}
                  value={item.id}
                >
                  {item.page_name}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-lg text-slate-700">
              Төрөл <span className="text-red-500">*</span>
            </label>
            <select
              className="text-italic text-slate-400 block bg-white w-full tablet:w-[500px] border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500"
              name="type"
              onChange={selectTypeOnChange}
              value={clickedType !== null && clickedType}
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
        <label className="font-semibold text-lg text-slate-700">
          Зураг <span className="text-red-500">*</span>
        </label>
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
                        selectedImage.image_string &&
                        `data:image/jpg;base64,${selectedImage.image_string}`
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
          editorClassName="bg-white px-8 text-lg bg-slate-100 text-slate-800"
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
      {otherOversize && (
        <p className="text-red-500">
          <span className="text-red-500">*</span> зургийн хэмжээ 1MB-ээс
          хэтэрсэн байна!
        </p>
      )}
      {showError && (
        <p className="text-red-500">
          <span>*</span> тэмдэглэсэн талбаруудын мэдээллийг бүрэн оруулна уу!
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

export default AddFilter;
