import React from "react";
import axios from "axios";
class BaseHelper {
  CallServiceWorker = (props) => {
    var token = localStorage.getItem("token");
    var { url, params, page, rowsPerPage } = props;
    const res = axios.get(
      process.env.REACT_APP_API_URL +
        `/${url}?page[number]=${
          page + 1
        }&page[size]=${rowsPerPage}&params=${params}`,
      { headers: { authorization: "Bearer " + token } }
    );

    return res;
  };
  SingleServiceWorker = (props) => {
    var token = localStorage.getItem("token");
    var { url, id } = props;
    const res = axios.get(process.env.REACT_APP_API_URL + `/${url}/${id}`, {
      headers: { authorization: "Bearer " + token },
    });

    return res;
  };
  SingleSearchWorker = (props) => {
    var token = localStorage.getItem("token");
    var { url, id } = props;
    const res = axios.post(
      process.env.REACT_APP_API_URL + `/${url}/company`,
      {
        id,
      },

      {
        headers: { authorization: "Bearer " + token },
      }
    );

    return res;
  };
  SingleSearchCreateWorker = (props) => {
    var token = localStorage.getItem("token");
    var { url, id, Type } = props;
    const res = axios.post(
      process.env.REACT_APP_API_URL + `/${url}/create-company`,
      {
        id,
        Type,
      },

      {
        headers: { authorization: "Bearer " + token },
      }
    );

    return res;
  };
  UpdateServiceWorker = (props) => {
    var token = localStorage.getItem("token");
    var { currentState, id, url } = props;

    const res = axios.put(
      process.env.REACT_APP_API_URL + `/${url}/${id}`,
      currentState,
      { headers: { authorization: "Bearer " + token } }
    );

    return res;
  };
  PostServiceWorker = (props) => {
    var token = localStorage.getItem("token");
    var { currentState, url } = props;

    const res = axios.post(
      process.env.REACT_APP_API_URL + `/${url}`,
      currentState,
      { headers: { authorization: "Bearer " + token } }
    );
    return res;
  };

  DeleteServiceWorker = (props) => {
    var token = localStorage.getItem("token");
    var { id, url } = props;
    const res = axios.delete(process.env.REACT_APP_API_URL + `/${url}/${id}`, {
      headers: { authorization: "Bearer " + token },
    });
    return res;
  };

  getValue = (object, field) => {
    if (!field) {
      return null;
    }
    let value = object;
    for (let i = 0; i < field.split(".").length; i++) {
      let key = field.split(".")[i];

      if (value[key] != undefined && value[key] != null) {
        let key1 = key.split("/")[0];

        value = value[key];
      } else {
        return null;
      }
    }
    return value;
  };

  getToday = () => {
    let today = new Date();
    return today;
  };
  getThisMonth = () => {
    let d = new Date();
    d.setDate(1);
    return d;
  };

  getRole = () => {
    var token = localStorage.getItem("token");
    if (!token) {
      return null;
    }
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    return JSON.parse(window.atob(base64));
  };

  checkToken = () => {
    var token = localStorage.getItem("token");
    if (!token) {
      return false;
    } else return true;
  };

  getToken = () => {
    var token = localStorage.getItem("token");
    if (!token) {
      return null;
    } else return token;
  };
  getDateYMD = function (Option) {
    var date = null;
    // if (Option === undefined) {
    //   date = new Date();
    // } else {
    //   if (Option.Date === undefined && Option.DateStr !== "") {
    //     date = new Date(Option.DateStr);
    //   }
    //   if (
    //     Option.Date !== undefined &&
    //     Option.Date !== null &&
    //     Option.DateStr === undefined
    //   ) {
    //     date = Option.Date;
    //   }
    //   if (
    //     (Option.Date === undefined || Option.Date === null) &&
    //     (Option.DateStr === undefined ||
    //       Option.DateStr === null ||
    //       Option.DateStr === "")
    //   ) {
    //     date = new Date();
    //   }
    // }

    date = new Date(Option);
    function pad2(n) {
      return (n < 10 ? "0" : "") + n;
    }

    return (
      date.getFullYear() +
      "-" +
      pad2(date.getMonth() + 1) +
      "-" +
      pad2(date.getDate())
    );
  };
}

export default new BaseHelper();
