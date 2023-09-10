import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import User from "./user/pages/User";
import AdminAuth from "./admin/layout/AdminAuth";
const NotAuthenticated = () => {
  return (
    <Routes>
      <Route path="user/*" element={<User />} />
      <Route path="admin/*" element={<AdminAuth />} />
      <Route path="home" exact element={<Navigate replace to="/user" />} />
      <Route path="/" element={<Navigate replace to="/user" />} />
    </Routes>
  );
};

export default NotAuthenticated;
