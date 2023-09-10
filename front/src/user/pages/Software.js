import React from "react";
import Header from "../components/Header";
import Filter from "../components/Filter/Filter";
import Breadcrumb from "../components/Breadcrumb";
import { useLocation } from "react-router-dom";

const Software = () => {
  const history = useLocation();
  return (
    <div className="min-h-screen">
      <Header page="software" />
      <Breadcrumb history={history.pathname.split("/")} />
      <div className="container">
        <Filter page="software" />
      </div>
    </div>
  );
};

export default Software;
