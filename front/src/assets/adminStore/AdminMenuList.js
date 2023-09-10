import { BiNews } from "react-icons/bi";
import { AiFillFilter } from "react-icons/ai";
import { BsInfoSquareFill } from "react-icons/bs";
import { MdOutlineImportContacts } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";
import { FaToolbox } from "react-icons/fa";
import { RiPagesLine } from "react-icons/ri";
const AdminMenuList = [
  {
    id: 1,
    name: "Мэдээ",
    icon: <BiNews />,
    url: "/admin",
    // DropDownMenus: [
    //   { id: 2, name: "Мэдээ", url: "/adminnews" },
    //   { id: 3, name: "Мэдээ оруулах", url: "/addnews" },
    // ],
  },

  {
    id: 4,
    name: "Filter",
    icon: <AiFillFilter />,
    url: "/admin/filter",
    // DropDownMenus: [
    //   { id: 5, name: "Filter", url: "/filter" },
    //   { id: 6, name: "Add Filter Content", url: "/addfilter" },
    // ],
  },
  {
    id: 7,
    name: "Танилцуулга",
    icon: <BsInfoSquareFill />,
    DropDownMenus: [
      { id: 8, name: "Мэндчилгээ", url: "/admin/addgreeting" },
      { id: 9, name: "Компаний тухай", url: "/admin/addaboutcomp" },
      { id: 10, name: "Бизнесийн үндсэн чиглэл", url: "/admin/busifield" },
      { id: 11, name: "Бидний үнэт зүйлс", url: "/admin/companyvalue" },
    ],
  },
  {
    id: 12,
    name: "Холбоо барих",
    url: "/admin/addcontact",
    icon: <MdOutlineImportContacts />,
  },
  {
    id: 13,
    name: "Харилцагч байгуулагууд",
    url: "/admin/customerlist",
    icon: <FaUserFriends />,
  },
  {
    id: 14,
    name: "Тоног төхөөрөмж",
    url: "/admin/equipmentlist",
    icon: <FaToolbox />,
  },
  {
    id: 15,
    name: "Home slider",
    url: "/admin/slider",
    icon: <RiPagesLine />,
  },
];

export default AdminMenuList;
