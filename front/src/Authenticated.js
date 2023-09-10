import React from "react";
import { Route, Routes } from "react-router-dom";
import Admin from "./admin/Admin";
import User from "./user/pages/User";
const Authenticated = () => {
  return (
    <Routes>
      <Route path="admin/*" element={<Admin />} />
      <Route path="user/*" element={<User />} />
      <Route path="/" element={<User />} />
    </Routes>
  );
};

export default Authenticated;
