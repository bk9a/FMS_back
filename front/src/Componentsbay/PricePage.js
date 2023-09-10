import React from "react";
import Box from "./box";
const pricePage = () => {
  console.log("testtt");
  return (
    <div>
      <h1 className="text-xl font-bold">MEMBERSHIP PLANS</h1>
      <div className="flex justify-between items-center w-full h-full">
        <Box price="17" name="BASIC" />
        <Box price="57" name="STANDARD" />
        <Box price="98" name="PREMIUM" />
      </div>
    </div>
  );
};

export default pricePage;
