import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";

// import AdminLayout from "layouts/Admin.js";
import App from "./App";
// import Home from "./components/pages/Home";
import CalculatorCal from "./components/organs/CalculatorCal";
import Cal from "./components/pages/Cal";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login.js";
import Admin from "./components/layout/Admin";
import Customer from "./components/admin/customer/Table";
import Lesson from "./components/admin/lesson/Table";
import Dashboard from "./components/admin/dashboard";
import Main from "./components/layout/Main";
export default function () {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cal" element={<CalculatorCal />} />
      <Route path="main" element={<Main />}>
        <Route path="class" element={<Customer />} />
        <Route path="lesson" element={<Lesson />} />
        <Route index element={<Dashboard />} />
      </Route>
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
