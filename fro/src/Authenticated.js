import React from "react";
import { Route, Routes ,Navigate} from "react-router-dom";

// import AdminLayout from "layouts/Admin.js";
import App from "./App";
import Home from "./components/pages/Home";

export default function () {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      
      <Route
        path="*"
        element={<Navigate to="/" replace />}
    />
    </Routes>
  );
}
