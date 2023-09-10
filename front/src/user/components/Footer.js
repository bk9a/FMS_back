import React from "react";

import MenuItems from "./Toolbar/Menu/MenuItems";
import ToolbarMenuItems from "./Toolbar/ToolbarMenu/ToolbarMenuItems";
import { HiChevronRight } from "react-icons/hi";
import { ImPhone } from "react-icons/im";
import { IoIosMail } from "react-icons/io";
import { FaMapMarked } from "react-icons/fa";
import Icon from "./Icon";
const Footer = () => {
  const titleStyle = "text-lg font-semibold mb-1";
  const colStyle =
    "w-full divide-y divide-slate-400 hover:divide-blue-500 py-4 tablet:w-1/4 tablet:py-0";

  return (
    <div className="w-full bg-slate-900 flex flex-col items-center">
      <div className="container py-6 w-full flex flex-col items-center text-white text-base tablet:flex-row tablet:justify-between tablet:items-start tablet:py-6">
        <div className={colStyle}>
          <h1 className={titleStyle}>ҮНДСЭН ЦЭС</h1>
          <MenuItems
            ulStyle="pt-2"
            liStyle="flex items-center hover:text-blue-500 duration-300 leading-loose"
            iconn={
              <HiChevronRight style={{ marginLeft: -7, paddingLeft: -7 }} />
            }
            iconnSize="20"
            iconnColor="2563eb"
          />
        </div>
        <div className={colStyle}>
          <h1 className={titleStyle}>ТУСЛАХ ЦЭС</h1>
          <ToolbarMenuItems
            toolUlStyle="pt-2"
            toolLiStyle="flex items-center width-fit justify-start hover:text-blue-500 duration-300 leading-loose"
            line={false}
            Iconsline={false}
            IconStyle="mr-3"
            socialLink="pt-2"
            footer
            iconn={
              <HiChevronRight style={{ marginLeft: -7, paddingLeft: -7 }} />
            }
            iconnSize="20"
            iconnColor="2563eb"
          />
        </div>
        <div className={colStyle}>
          <h1 className={titleStyle}>ХАЯГ БАЙРШИЛ</h1>
          <div className="pt-2 leading-normal">
            <div className="flex items-start">
              <Icon
                color="2563eb"
                styles="mr-1"
                size="18"
                iconn={<FaMapMarked />}
              />
              Монгол улс, Улаанбаатар хот, Чингэлтэй дүүрэг,
              <br /> 6-р хороо, MN Тауэр, 1307 тоот
            </div>
            <div className="flex items-center">
              <Icon
                color="2563eb"
                size="18"
                styles="mr-1"
                iconn={<ImPhone />}
              />
              <strong>Утас:</strong>
              <p className="ml-1">7710-0707</p>
            </div>
            <div className="flex items-center">
              <Icon
                color="2563eb"
                styles="mr-1"
                size="18"
                iconn={<IoIosMail />}
              />
              <strong>И-мэйл:</strong>
              <p className="ml-1">info@itsystem.mn</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-slate-800 w-full flex justify-center items-center  text-white leading-6 text-xs tablet:text-base tablet:leading-7">
        <p className="block">
          Бүх эрх хуулиар хамгаалагдсан © 2004 - {new Date().getFullYear()}{" "}
          ITSYSTEM.MN
        </p>
      </div>
    </div>
  );
};

export default Footer;
