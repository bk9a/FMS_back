import React from "react";
import AboutUS from "../components/AboutUS";
import BusinessField from "../components/BusinessField";
import CompanyValue from "../components/company_core_value/CompanyValue";
import Greeting from "../components/Greeting";
import Header from "../components/Header";
import { useLocation } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";

const AboutUsPage = () => {
  const history = useLocation();

  return (
    <>
      <Header page="aboutus" />
      <Breadcrumb history={history.pathname.split("/")} />
      <div className="container space-y-8 py-8">
        <Greeting />
        <AboutUS />
        <BusinessField />
        <CompanyValue />
      </div>
    </>
  );
};

export default AboutUsPage;
