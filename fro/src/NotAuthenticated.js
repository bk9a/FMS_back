import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// import AuthLayout from "layouts/Auth.js";
import Cal from "./components/pages/Cal";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login.js";
import App from "./App";

export default function () {

  console.log(" not auth ");

  return (
    
    <Routes>
       
      <Route path="/login" element={<Login />}  />
      <Route path="/" element={<Home />}  />


    </Routes>
  );
}
