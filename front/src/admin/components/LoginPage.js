import React, { useEffect, useState } from "react";
import logoImg from "../../assets/img/itsys-logo.png";
import background from "../../assets/img/loginback2.jpg";
import { useAuth } from "../context/auth.js";

const LoginPage = () => {
  const [password, setPassword] = useState(null);
  const [username, setUsername] = useState(null);
  const [error, setError] = useState(null);
  const { Login, Message, notLogin, setNotLogin, setMessage } = useAuth();

  // нэвтрэх button дарагдах үед ажилна.
  const GetLogin = () => {
    if (username && password) {
      //useAuth context-ийн login функцийг дуудаж ажлуулна
      Login({ username: username, password: password });
    } else {
      setMessage("Нэвтрэх нэр, нууц үгээ оруулна уу!!!");
      setNotLogin(true);
    }
  };
  return (
    <div className="relative w-full h-screen flex flex-col justify-center items-center bg-slate-600">
      <div className="backdrop-blur flex flex-col justify-center items-center h-[440px] w-full tablet:w-[400px] bg-white/30 tablet:rounded-lg z-20">
        <img
          alt="logo"
          className="w-52 h-auto object-contain mb-16 rounded-md select-none"
          src={logoImg}
        />
        <input
          className="mb-8 w-80 h-10 bg-slate-100 rounded-md px-4 text-slate-500 focus:outline-none focus:border-sky-500 focus:ring focus:ring-sky-500 text-lg"
          type="text"
          name="name"
          placeholder="Хэрэглэгчийн нэр"
          onChange={(e) => {
            setNotLogin(false);
            setUsername(e.target.value);
          }}
        />
        <input
          className="mb-2 w-80 h-10 bg-slate-100 rounded-md px-4 text-slate-500 focus:outline-none focus:border-sky-500 focus:ring  focus:ring-sky-500 text-lg"
          type="password"
          name="password"
          placeholder="Нууц үг"
          onChange={(e) => {
            setNotLogin(false);
            setPassword(e.target.value);
          }}
        />
        <p className={notLogin ? "visible" : "invisible"}>
          <span className="text-white font-semibold">
            {Message && Message.length > 0 && Message}
          </span>
        </p>
        <button
          onClick={GetLogin}
          className="text-white bg-sky-400 font-semibold rounded-md py-2 mt-2 px-4 focus:outline-none focus:border-sky-500 focus:ring focus:ring-sky-500 hover:bg-sky-600 duration-100 select-none"
        >
          НЭВТРЭХ
        </button>
      </div>
      <img
        alt="background_image"
        className="absolute h-screen w-full object-cover z-0 select-none"
        src={background}
      />
      <p className="absolute bottom-10 tablet:bottom-10 tablet:right-14 text-white font-semibold uppercase text-md select-none">
        IT System LLC | {new Date().getFullYear()}
      </p>

      <div className="absolute h-screen w-full z-10"></div>
    </div>
  );
};

export default LoginPage;
