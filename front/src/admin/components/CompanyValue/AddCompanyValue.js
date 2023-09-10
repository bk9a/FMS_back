import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "../Button";
import { useNavigate, useParams } from "react-router";
import { useAlert } from "react-alert";
import { useAuth } from "../../context/auth";

const AddCompanyValue = () => {
  const alert = useAlert();
  let navigate = useNavigate();
  const [value, setValue] = useState("");
  const { LogOut } = useAuth;
  let { id } = useParams();
  const [showError, setError] = useState(false);

  useEffect(() => {
    if (id) {
      getDataById(id);
    }
  }, []);

  useEffect(() => {
    setValue("");
  }, [id]);

  const getDataById = async (id) => {
    await axios
      .get(`${process.env.REACT_APP_API}/company-value/${id}`, {
        headers: {
          authorization: "Bearer " + localStorage.getItem("ITSToken"),
        },
      })
      .then((response) => {
        // const loadNews = Object.entries(response.data.data.data);
        let res = response.data.data;
        setValue(res.value);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const sendData = async () => {
    if (id) {
      const formData = new FormData();

      if (value !== "") {
        formData.append("value", value);
      } else {
        setError(true);
        return;
      }

      await axios
        .put(`${process.env.REACT_APP_API}/company-value/${id}`, formData, {
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
    } else {
      const formData = new FormData();

      if (value !== "") {
        formData.append("value", value);
      } else {
        setError(true);
        return;
      }

      await axios
        .post(`${process.env.REACT_APP_API}/company-value`, formData, {
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
          Агуулга<span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          placeholder="Агуулга..."
          className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 tablet:w-[900px]"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
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

export default AddCompanyValue;
