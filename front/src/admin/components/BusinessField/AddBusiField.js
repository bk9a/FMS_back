import React, { useState, useEffect } from "react";
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
import { useAlert } from "react-alert";
import { useAuth } from "../../context/auth";

const AddBusiField = () => {
  const [editorState, setEditorState] = useState(null);
  const [showImage, setShowImage] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [newImage, setNewImage] = useState(false);
  const [oversizeError, setOversizeError] = useState(false);
  const [showError, setError] = useState(false);
  const alert = useAlert();
  let navigate = useNavigate();
  const { LogOut } = useAuth();

  const [title, setTitle] = useState("");
  const onEditorStateChange = (es) => {
    setEditorState(es);
  };

  let { id } = useParams();

  useEffect(() => {
    if (id) {
      getDataById(id);
    }
    setOversizeError(false);
  }, []);

  useEffect(() => {
    setTitle("");
    const newEditorState = EditorState.createEmpty();
    setEditorState(newEditorState);
    setSelectedImage(null);
    setNewImage(false);
    setShowImage(false);
  }, [id]);

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
    setOversizeError(false);
  };

  const getDataById = async (id) => {
    await axios
      .get(`${process.env.REACT_APP_API}/business-field/${id}`, {
        headers: {
          authorization: "Bearer " + localStorage.getItem("ITSToken"),
        },
      })
      .then((response) => {
        // const loadNews = Object.entries(response.data.data.data);
        let res = response.data.data;
        let image1 = null;
        image1 = res.icon_string;
        if (image1 !== null && image1 !== undefined) {
          setShowImage(true);
          setSelectedImage(image1);
        }

        setTitle(res.title);

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

      if (selectedImage !== null && title !== "") {
        if (newImage) {
          formData.append("image", selectedImage);
        }

        formData.append("title", title);

        formData.append(
          "contents",
          draftToHtml(convertToRaw(editorState.getCurrentContent()))
        );
      } else {
        setError(true);
        return;
      }

      await axios
        .put(
          `${process.env.REACT_APP_API}/business-field/${id}`,

          formData,
          {
            headers: {
              authorization: "Bearer " + localStorage.getItem("ITSToken"),
            },
          }
        )
        .then((response) => {
          if (response.data.success === true) {
            alert.success("Өгөгдөл амжилттай хадгалагдлаа!", {
              closeCopy: "Хаах",
              onClose: () => {
                navigate(`/admin/busifield`);
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

      if (selectedImage !== null && title !== "") {
        if (newImage) {
          formData.append("image", selectedImage);
        }

        formData.append("title", title);

        formData.append(
          "contents",
          draftToHtml(convertToRaw(editorState.getCurrentContent()))
        );
      } else {
        setError(true);
        return;
      }

      await axios
        .post(`${process.env.REACT_APP_API}/business-field`, formData, {
          headers: {
            authorization: "Bearer " + localStorage.getItem("ITSToken"),
          },
        })
        .then((response) => {
          if (response.data.success === true) {
            alert.success("Өгөгдөл амжилттай хадгалагдлаа!", {
              closeCopy: "Хаах",
              onClose: () => {
                navigate(`/admin/busifield`);
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
    }
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
                alt="image"
                className="w-[500px] h-[300px] object-contain"
                src={
                  id
                    ? newImage
                      ? URL.createObjectURL(selectedImage)
                      : selectedImage &&
                        `data:image/png;base64,${selectedImage}`
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
      {showError && (
        <p className="text-red-500">
          <span className="text-red-500">*</span> тэмдэглэсэн талбаруудын
          мэдээллийг бүрэн оруулна уу!
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

export default AddBusiField;
