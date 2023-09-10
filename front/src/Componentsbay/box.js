import React from "react";

const box = (props) => {
  console.log("testtt");
  return (
    <div class="flex flex-col">
      <h1 className="text-xl font-bold bg-bodyhack">{props.name}</h1>
      <div>
        <p className="text-xl font-bold">
          <span>${props.price}</span>/01 mo
        </p>
        <p>duration</p>
        <p>12 months</p>
        <p>Personal trainer</p>
        <p>00 person</p>
        <p>Amount of people</p>
        <p>01 person</p>
        <p>Number of visits</p>
        <p>Unlimited</p>
      </div>
    </div>
  );
};

export default box;
