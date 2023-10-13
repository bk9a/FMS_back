import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserHistory } from "history";
import reportWebVitals from "./reportWebVitals";

import { Provider } from "react-redux";
import store from "./redux";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import Authenticated from "./Authenticated.js";
import NotAuthenticated from "./NotAuthenticated.js";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "antd/dist/reset.css";
import "./assets/styles/main.css";
import "./custom-theme.less";
import "./assets/styles/responsive.css";

import { useDispatch, useSelector } from "react-redux";
import { checkLogin } from "./redux/reducers/users";
// import App from "./App";

const hist = createBrowserHistory();

function App() {
  const token = useSelector((state) => state.system.token);
  console.log({ token });
  const loading = useSelector((state) => state.system.sysLoading);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkLogin());
  }, []);

  // if (loading) {
  //   return (
  //     <>
  //       <BaseBackdrop /> <BaseSnackbar />
  //     </>
  //   );
  // }

  if (token) {
    return <Authenticated />;
  } else {
    console.log("fuck u ");
    return <NotAuthenticated />;
  }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      {" "}
      <Provider store={store}>
        {" "}
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
  //   <React.StrictMode>
  //   <BrowserRouter>
  //   <Provider store={store}> <App /></Provider>
  //   </BrowserRouter>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
