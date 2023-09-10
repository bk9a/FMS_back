import Addnews from "./components/News/AddNews/AddNews";
import AdminNews from "./components/News/NewsView/AdminNews";
import Filter from "./components/Filter/Filter";
import AddFilter from "./components/Filter/AddFilter";
import AddGreeting from "./components/Intro/AddGreeting";
import AddAboutComp from "./components/Intro/AddAboutComp";
import BusiField from "./components/BusinessField/BusiField";
import AddBusiField from "./components/BusinessField/AddBusiField";
import ListCompanyValue from "./components/CompanyValue/ListCompanyValue";
import AddCompanyValue from "./components/CompanyValue/AddCompanyValue";
import AddContact from "./components/Intro/AddContact";
import ListCustomer from "./components/Customer/ListCustomer";
import AddCustomer from "./components/Customer/AddCustomer";
import ListEqiupment from "./components/Equipment/ListEqiupment";
import AddEquipment from "./components/Equipment/AddEquipment";
import homeSlider from "./components/homeSlider/HomeSlider";
import addSlider from "./components/homeSlider/AddSlider";
let routes = [
  {
    path: "/addequipment/:id",
    component: AddEquipment,
  },
  {
    path: "/addequipment",
    component: AddEquipment,
  },
  {
    path: "/equipmentlist",
    component: ListEqiupment,
  },
  {
    path: "/addcustomer/:id",
    component: AddCustomer,
  },
  {
    path: "/addcustomer",
    component: AddCustomer,
  },
  {
    path: "/customerlist",
    component: ListCustomer,
  },
  {
    path: "/addcontact",
    component: AddContact,
  },
  {
    path: "/addcompanyvalue",
    component: AddCompanyValue,
  },
  {
    path: "/addcompanyvalue/:id",
    component: AddCompanyValue,
  },
  {
    path: "/companyvalue",
    component: ListCompanyValue,
  },
  {
    path: "/addaboutcomp",
    component: AddAboutComp,
  },
  {
    path: "/busifield",
    component: BusiField,
  },
  {
    path: "/addbusifield/:id",
    component: AddBusiField,
  },
  {
    path: "/addbusifield",
    component: AddBusiField,
  },
  {
    path: "/addnews/:id",
    component: Addnews,
  },
  {
    path: "/addnews",
    component: Addnews,
  },
  {
    path: "/",
    component: AdminNews,
  },
  {
    path: "/filter",
    component: Filter,
  },
  {
    path: "/addfilter",
    component: AddFilter,
  },
  {
    path: "/addfilter/:id",
    component: AddFilter,
  },
  {
    path: "/addgreeting",
    component: AddGreeting,
  },
  {
    path: "/slider",
    component: homeSlider,
  },
  {
    path: "/addslider",
    component: addSlider,
  },
  {
    path: "/addslider/:id",
    component: addSlider,
  },
];
export default routes;
