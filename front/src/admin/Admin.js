import React, { useState } from "react";
import AdminSidebar from "./components/AdminSidebar";
import routesAdmin from "./routesAdmin";
import { Route, Routes, Navigate } from "react-router-dom";
import AdminHeader from "./components/AdminHeader";
import MiniSidebar from "./components/MiniSidebar";

const Admin = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  const toggleSidebar = () => {
    setShowSidebar((prevShowSidebar) => !prevShowSidebar);
  };

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      return (
        <Route
          exact
          path={`${prop.path}`}
          element={<prop.component />}
          key={key}
        />
      );
    });
  };

  return (
    <div className="flex w-full max-h-screen">
      <AdminSidebar showSidebar={showSidebar} />
      <MiniSidebar showSidebar={showSidebar} toggleSidebar={toggleSidebar} />
      <div className="w-full max-h-screen overflow-y-auto">
        <AdminHeader showSidebar={showSidebar} toggleSidebar={toggleSidebar} />
        <div className="w-full h-fit">
          <Routes>
            {getRoutes(routesAdmin)}
            <Route path="/login" element={<Navigate replace to="/admin" />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Admin;
