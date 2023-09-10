import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import LoginPage from "../components/LoginPage";
const AdminAuth = () => {
  return (
    <Routes>
      <Route path="/login" exact element={<LoginPage />} />
      <Route path="/" element={<Navigate replace to="/admin/login" />} />
    </Routes>
  );
};

export default AdminAuth;
