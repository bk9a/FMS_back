import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import CalculatorCal from "./components/organs/CalculatorCal";

// import AuthLayout from "layouts/Auth.js";
import Cal from "./components/pages/Cal";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login.js";
import Admin from "./components/layout/Admin";
import Customer from "./components/admin/customer/Table";
import Lesson from "./components/admin/lesson/Table";
import Dashboard from "./components/admin/dashboard";
import Main from "./components/layout/Main";
import App from "./App";
import AdminHome from "components/userAdmin/Pages/AdminHome";
export default function () {
  console.log(" not auth ");

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Home />} />
      {/* <Route path="/cal" element={<CalculatorCal />} /> */}
      {/* <Route path="/customer" element={<Customer />} /> */}
      <Route path="admin" element={<Admin />}>
        <Route path="customer" element={<Customer />} />
        <Route path="lesson" element={<Lesson />} />
        <Route index element={<Dashboard />} />
      </Route>

      <Route path="userAdmin" element={<AdminHome />}></Route>

      <Route path="main" element={<Main />}>
        <Route path="class" element={<Customer />} />
        <Route path="lesson" element={<Lesson />} />
        <Route index element={<Dashboard />} />
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
