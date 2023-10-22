import React from "react";
import { Button } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";

const PaymentItems = ({ price, duration, title, items, buyOnclick }) => {
  return (
    <div className="w-full h-fit bg-white py-8 flex flex-col justify-center border border-teal-400 items-center space-y-8">
      <p className="text-teal-600 text-xl font-semibold">
        ₮{price}/{duration}
      </p>
      <p className="w-full h-10 flex items-center justify-center bg-teal-400 text-white font-bold">
        {title}
      </p>
      <div className="flex flex-col justify-center items-center w-full space-y-3">
        {items.map((item, index) => (
          <p className="border-b-2 border-teal-400 text-teal-700" key={index}>
            {item}
          </p>
        ))}
      </div>
      <Button
        icon={<ShoppingCartOutlined />}
        className="bg-teal-400 w-36 h-10 text-lg hover:bg-teal-500 active:bg-teal-600 border-0 text-white hover:white"
        textHoverBg="#FFFFFF"
        type="none"
        onClick={buyOnclick}
      >
        Buy
      </Button>
    </div>
  );
};
export default PaymentItems;
