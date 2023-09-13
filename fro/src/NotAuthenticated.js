import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// import AuthLayout from "layouts/Auth.js";
import Cal from "./components/pages/Cal";
import Home from "./components/pages/Home";
import App from "./App";

export default function () {
  return (
    
    <Routes>
      <Route path="/" element={<Home />}  />

    </Routes>
  );
}
