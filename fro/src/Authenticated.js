import React from "react";
import { Route, Routes ,Navigate} from "react-router-dom";

// import AdminLayout from "layouts/Admin.js";
import App from "./App";
import Home from "./components/pages/Home";
import CalculatorCal from "./components/organs/CalculatorCal";

export default function () {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cal" element={<CalculatorCal />} />
      
      <Route
        path="*"
        element={<Navigate to="/login" replace />}
    />
    </Routes>
  );
}
