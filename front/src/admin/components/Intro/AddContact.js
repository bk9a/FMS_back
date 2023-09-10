import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "../Button";
import { useAlert } from "react-alert";

const AddContact = () => {
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [showError, setError] = useState(false);
  const alert = useAlert();

  useEffect(() => {
    getDataById();
  }, []);

  const getDataById = async () => {
    await axios
      .get(`${process.env.REACT_APP_API}/contact`, {
        headers: {
          authorization: "Bearer " + localStorage.getItem("ITSToken"),
        },
      })
      .then((response) => {
        // const loadNews = Object.entries(response.data.data.data);
        let res = response.data.data;
        setAddress(res.filter((item) => item.c_key === "address")[0].value);
        setPhone(res.filter((item) => item.c_key === "phone")[0].value);
        setEmail(res.filter((item) => item.c_key === "email")[0].value);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const sendData = async () => {
    const allData = [address, phone, email];
    let successCount = 0;

    if (address !== "" && email !== "" && phone !== "") {
      setError(true);
    }

    for (let i = 0; i < 3; i++) {
      let link;
      const formData = new FormData();

      if (allData[i] == address) {
        link = "address";
        formData.append("value", address);
      }
      if (allData[i] == phone) {
        link = "phone";
        formData.append("value", phone);
      }
      if (allData[i] == email) {
        link = "email";
        formData.append("value", email);
      }
      await axios
        .put(`${process.env.REACT_APP_API}/contact/${link}`, formData, {
          headers: {
            authorization: "Bearer " + localStorage.getItem("ITSToken"),
          },
        })
        .then((response) => {
          if (response.data.success === true) {
            successCount++;
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
    if (successCount === 3) {
      alert.success("Өгөгдөл амжилттай хадгалагдлаа!", {
        closeCopy: "Хаах",
      });
    } else {
      alert.success("Өгөгдөл оруулахад алдаа гарлаа", {
        closeCopy: "Хаах",
      });
    }
  };

  return (
    <div className="flex flex-col h-full rounded-md p-8 space-y-8">
      <div className="space-y-1">
        <label className="font-semibold text-lg text-slate-700">
          Хаяг<span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          placeholder="Гарчиг..."
          className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 tablet:w-[700px]"
          value={address}
          onChange={(e) => {
            setAddress(e.target.value);
          }}
        />
      </div>
      <div className="space-y-1">
        <label className="font-semibold text-lg text-slate-700">
          И мейл<span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          placeholder="Гарчиг..."
          className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 tablet:w-[700px]"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </div>
      <div className="space-y-1">
        <label className="font-semibold text-lg text-slate-700">
          Утас<span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          placeholder="Гарчиг..."
          className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 tablet:w-[700px]"
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value);
          }}
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

export default AddContact;
