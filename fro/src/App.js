import {  Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
//importing react slick slider
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { animateScroll } from "react-scroll";
import Home from "./components/pages/Home";
import Footer from "./components/organs/Footer";
import { useDispatch, useSelector } from "react-redux";
import { checkLogin } from "./redux/reducers/users";
// import React, { useEffect } from 'react';
import { Routes } from './routes';

const App = () => {
  const token = useSelector((state) => state.system.token);
  console.log({token});
  const loading = useSelector((state) => state.system.sysLoading);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkLogin());
  }, []);
  return (
    <Routes isAuthorized={false} />
  );
}

export default App;