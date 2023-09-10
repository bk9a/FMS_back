import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import mntower from "../../assets/img/mntower.jpg";
import Icon from "../components/Icon";
import { ImPhone } from "react-icons/im";
import { IoIosMail } from "react-icons/io";
import { FaMapMarked } from "react-icons/fa";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";

const Contact = () => {
  const history = useLocation();
  const contactItemStyle = "flex w-full laptop:w-80 space-x-3";
  const txtStyle = "text-xl tablet:text-2xl laptop:text-lg text-slate-500";
  const headerStyle =
    "text-blue-600 text-2xl tablet:text-4xl laptop:text-3xl font-semibold";
  const [state, setState] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    await axios
      .get(`${process.env.REACT_APP_API}/contact`)
      .then((response) => {
        let res = response.data.data;
        setState(res);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <>
      <Header page="contact" />
      <Breadcrumb history={history.pathname.split("/")} />
      <div className="container flex flex-wrap items-start justify-between my-4 laptop:space-y-0">
        <img
          className="w-full laptop:w-1/3 h-[500px] laptop:h-[450px] object-cover"
          src={mntower}
          alt="mn tower"
        />
        <div className="flex flex-col justify-around h-[450px]">
          <div className={contactItemStyle}>
            <Icon
              color="2563eb"
              styles="mt-1"
              size="25"
              iconn={<FaMapMarked />}
            />
            <div>
              <h1 className={headerStyle}>Хаяг</h1>
              {state && state.length > 0 && (
                <p className={txtStyle}>
                  {state.filter((item) => item.c_key === "address")[0].value}
                </p>
              )}
            </div>
          </div>
          <div className={contactItemStyle}>
            <Icon color="2563eb" size="25" styles="mt-1" iconn={<ImPhone />} />
            <div>
              <h1 className={headerStyle}>Утас</h1>
              {state && state.length > 0 && (
                <p className={txtStyle}>
                  {state.filter((item) => item.c_key === "phone")[0].value}
                </p>
              )}
            </div>
          </div>
          <div className={contactItemStyle}>
            <Icon
              color="2563eb"
              styles="mt-1"
              size="25"
              iconn={<IoIosMail />}
            />
            <div>
              <h1 className={headerStyle}>Имейл хаяг</h1>
              {state && state.length > 0 && (
                <p className={txtStyle}>
                  {state.filter((item) => item.c_key === "email")[0].value}
                </p>
              )}
            </div>
          </div>
        </div>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2673.721112757395!2d106.9029809158854!3d47.92243347409933!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5d969366c8b6b9a7%3A0x46313f3d850bf7cc!2sMN%20Tower%20Mongolia!5e0!3m2!1sen!2smn!4v1653452018933!5m2!1sen!2smn"
          className="w-full h-[500px] laptop:w-1/3 laptop:h-[450px] border-2 border-blue-600 mb-5"
        ></iframe>
      </div>
    </>
  );
};

export default Contact;
