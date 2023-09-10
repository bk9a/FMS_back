import React, { useEffect, useState } from "react";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Button from "../Button";
import axios from "axios";
import htmlToDraft from "html-to-draftjs";
import { useAlert } from "react-alert";

const AddGreeting = () => {
  const [title, setTitle] = useState("");
  const [editorState, setEditorState] = useState(null);
  const [showError, setError] = useState(false);
  const alert = useAlert();

  const onEditorStateChange = (es) => {
    setEditorState(es);
  };

  useEffect(() => {
    getDataById();
  }, []);

  const getDataById = async () => {
    await axios
      .get(`${process.env.REACT_APP_API}/about-us/greeting`, {
        headers: {
          authorization: "Bearer " + localStorage.getItem("ITSToken"),
        },
      })
      .then((response) => {
        // const loadNews = Object.entries(response.data.data.data);
        let res = response.data.data;

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
    const formData = new FormData();

    if (title !== "" && editorState !== null) {
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
      .put(`${process.env.REACT_APP_API}/about-us/greeting`, formData, {
        headers: {
          authorization: "Bearer " + localStorage.getItem("ITSToken"),
        },
      })
      .then((response) => {
        if (response.data.success === true) {
          alert.success("Өгөгдөл амжилттай хадгалагдлаа!", {
            closeCopy: "Хаах",
          });
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div className="flex flex-col h-full rounded-md p-8 space-y-6">
      <div className="space-y-1">
        <label className="font-semibold text-lg text-slate-700">
          Гарчиг<span className="text-red-500">*</span>
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

      <div className="space-y-1 h-[500px]">
        <label className="font-semibold text-lg text-slate-700">
          Агуулга<span className="text-red-500">*</span>
        </label>
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

export default AddGreeting;
