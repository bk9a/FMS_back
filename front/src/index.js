import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import { positions, Provider as AlertProvider } from "react-alert";
import AlertMUITemplate from "react-alert-template-mui";

const options = {
  position: positions.MIDDLE,
};

ReactDOM.render(
  <AlertProvider template={AlertMUITemplate} {...options}>
    <BrowserRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </AlertProvider>,
  document.getElementById("root")
);

reportWebVitals();
