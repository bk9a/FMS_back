import React from "react";
import { SaveOutlined } from "@ant-design/icons";
import { Input, Button } from "antd";

const Profile = ({ price, duration, title, items, buyOnclick }) => {
  return (
    <div className="w-full h-fit flex flex-col justify-center items-start bg-white rounded-lg p-8 space-y-3">
      <div className="w-full h-fit flex flex-col justify-center items-start space-y-3">
        <p className="text-lg font-semibold">Хувийн мэдээлэл:</p>
        <Input className="w-72" placeholder="Нэр" />
        <Input className="w-72" placeholder="Нас" />
        <Input className="w-72" placeholder="Жин" />
      </div>
      <div className="w-full h-fit flex flex-col justify-center items-start space-y-3">
        <p className="text-lg font-semibold">Нууц үг шинэчлэх:</p>
        <Input className="w-72" placeholder="Одоогийн нууц үг" />
        <Input className="w-72" placeholder="Шинэ нууц үг" />
        <Input className="w-72" placeholder="Шинэ нууц үг давтах" />
      </div>
      <Button
        icon={<SaveOutlined />}
        className="bg-teal-400 w-36 h-9 text-base hover:bg-teal-500 active:bg-teal-600 border-0 text-white hover:white"
        textHoverBg="#FFFFFF"
        type="none"
      >
        Хадгалах
      </Button>
    </div>
  );
};
export default Profile;
