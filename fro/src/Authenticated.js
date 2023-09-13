import React from "react";
import { Route, Routes } from "react-router-dom";

// import AdminLayout from "layouts/Admin.js";
import App from "./App";
import Home from "./components/pages/Home";

export default function () {
  return (
    <Routes>
      <Route path="/" element={<App />} />
    </Routes>
  );
}
