import React, { useState, useEffect, createContext, useContext } from "react";
import Server from "../config/server";

const AuthContext = createContext({});
const useAuth = () => useContext(AuthContext);

function AuthProvider(props) {
  const [UserData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [LoginLoading, setLoginLoading] = useState(false);
  const [Message, setMessage] = useState(null);
  const [notLogin, setNotLogin] = useState(false);

  const Login = async ({ username, password }) => {
    const ResData = await Server.server({
      method: "PUT",
      data: { username, password },
      url: "/user/login",
    });
    const Data = ResData ? ResData.data : null;
    if (Data.success === true) {
      localStorage.setItem("ITSToken", Data.token);
      setNotLogin(false);
      setUserData(Data);
      setMessage(null);
    } else {
      setNotLogin(true);
      setUserData(null);
      setMessage(Data.message);
    }
  };

  const LogOut = async function () {
    try {
      const ResData = await Server.CallService({ Url: "/user/logout" });
      const Data = ResData.data;
      if (Data.Success === true) {
        setMessage(null);
      } else {
        setMessage(Data.Message);
      }
    } catch (ex) {
      setMessage(ex);
    } finally {
      setUserData(null);
      localStorage.removeItem("ITSToken");
    }
  };

  const GetUserData = async () => {
    const ResData = await Server.CallService({
      Url: "/user/get-user-data",
    });

    if (ResData.status === 401) {
      localStorage.removeItem("ITSToken");
      setUserData(null);
      setMessage(null);
    } else {
      var Data = ResData.data;
      if (Data.success === true) {
        setUserData(Data.LogedUser);
        setMessage(null);
        setNotLogin(false);
      } else {
        localStorage.removeItem("ITSToken");
        setUserData(null);
        setMessage(Data.Message);
        setNotLogin(true);
      }
    }
  };

  useEffect(() => {
    const Token = localStorage.getItem("ITSToken");
    if (Token) {
      GetUserData();
    } else {
      setUserData(null);
      setLoading(false);
      setNotLogin(false);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        UserData,
        Login,
        LogOut,
        loading,
        LoginLoading,
        setLoginLoading,
        Message,
        setMessage,
        notLogin,
        setNotLogin,
      }}
      {...props}
    />
  );
}

export { AuthProvider, useAuth, AuthContext };
