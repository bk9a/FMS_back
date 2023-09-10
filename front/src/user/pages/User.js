import React, { useState } from "react";
import { Route, Navigate, Routes } from "react-router-dom";

import Footer from "../components/Footer";
import ToolbarMenu from "../components/Toolbar/ToolbarMenu/ToolbarMenu";
import Menu from "../components/Toolbar/Menu/Menu";
import SideBar from "../components/Toolbar/SideBar";
import routes from "../routes";
import GotoTop from "../components/GotoTop";

function User() {
  const [showSidebar, setShowSidebar] = useState(false);

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
    <div className="bg-gray-50 font-rubik">
      <ToolbarMenu />
      <Menu toggleSidebar={toggleSidebar} />
      <SideBar showSidebar={showSidebar} toggleSidebar={toggleSidebar} />
      <Routes>
        {getRoutes(routes)}
        <Route path="/" element={<Navigate replace to="/user/home" />} />
        <Route />
      </Routes>
      <Footer />
      <GotoTop />
    </div>
  );
}

export default User;
