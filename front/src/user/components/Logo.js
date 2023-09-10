import React from "react";
import logo from "../../assets/img/itsys-logo.png";
import { Link } from "react-router-dom";

const Logo = (props) => {
  return (
    <Link to="/user/home">
      <img className={props.style} src={logo} />
    </Link>
  );
};

export default Logo;
