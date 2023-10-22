import React, { useState } from "react";
import { Modal } from "antd";
import PaymentItems from "../Components/PaymentItems";

const Payment = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    console.log("test");
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="w-full flex justify-center items-start space-x-24">
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
      <PaymentItems
        items={[
          "One Time Access To All Clubs",
          "Group Trainer",
          "Book A Group Class",
          "Fitness Orientation",
        ]}
        title={"One Day Training"}
        duration={"day"}
        price={"10,000"}
        buyOnclick={showModal}
      />
      <PaymentItems
        items={[
          "One Time Access To All Clubs",
          "Group Trainer",
          "Book A Group Class",
          "Fitness Orientation",
        ]}
        title={"One Day Training"}
        duration={"day"}
        price={"10,000"}
        buyOnclick={showModal}
      />
      <PaymentItems
        items={[
          "One Time Access To All Clubs",
          "Group Trainer",
          "Book A Group Class",
          "Fitness Orientation",
        ]}
        title={"One Day Training"}
        duration={"day"}
        price={"10,000"}
        buyOnclick={showModal}
      />
    </div>
  );
};
export default Payment;
