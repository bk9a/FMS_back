import Home from "./pages/Home";
import Software from "./pages/Software";
import News from "./components/News/News";
import Customer from "./pages/Customer";
import Service from "./pages/Service";
import Equipment from "./pages/Equipment";
import AboutUsPage from "./pages/AboutUsPage";
import FilterContentPage from "./components/Filter/FilterContentPage";
import Contact from "./pages/Contact";
import NewsList from "./components/News/NewsList";

let routes = [
  {
    path: "/home",
    component: Home,
  },
  {
    path: "/software",
    component: Software,
  },
  {
    path: "/equipment",
    component: Equipment,
  },
  {
    path: "/customer",
    component: Customer,
  },
  {
    path: "/service",
    component: Service,
  },
  {
    path: "/news/:id",
    component: News,
  },
  {
    path: "/aboutus",
    component: AboutUsPage,
  },
  {
    path: "/software/filter/:id",
    component: FilterContentPage,
  },
  {
    path: "/service/filter/:id",
    component: FilterContentPage,
  },
  {
    path: "/contact",
    component: Contact,
  },
  {
    path: "/news",
    component: NewsList,
  },
];
export default routes;
