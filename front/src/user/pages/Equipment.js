import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Card from "../components/Card";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";

const Equipment = () => {
  const [data, setData] = useState([]);
  const history = useLocation();

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios
      .get(`${process.env.REACT_APP_API}/equipment`)
      .then((response) => {
        const res = response.data.data;
        setData(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="min-h-screen">
      <Header page="equipment" />
      <Breadcrumb history={history.pathname.split("/")} />
      <div className="container flex justify-center">
        {data && data.length > 0 ? <Card data={data} /> : null}
      </div>
    </div>
  );
};

export default Equipment;
