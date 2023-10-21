import React from "react";
import { Input } from "antd";

const Field = () => {
  return (
    <div className="flex flex-row">
      <label htmlFor="myInput">My Label:</label>
      <Input id="myInput" placeholder="Enter something" />
    </div>
  );
};

export default Field;
