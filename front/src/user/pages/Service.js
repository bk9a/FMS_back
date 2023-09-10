import React from "react";
import Header from "../components/Header";
import Filter from "../components/Filter/Filter";
import { useLocation } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";

const Service = () => {
  const history = useLocation();

  return (
    <div className="min-h-screen">
      <Header page="service" />
      <Breadcrumb history={history.pathname.split("/")} />
      <div className="container">
        <Filter page="service" />
      </div>
    </div>
  );
};

export default Service;
