// import AnonymousLayout from "../layouts/AnonymousLayout";
// import MainLayout from "../layouts/MainLayout";

import AnonymousLayout from "../components/layout/AnonymousLayout";
import MainLayout from "../components/layout/Mainlayout";
import { renderRoutes } from "./generate-routes";
// Pages
// import Login from "../pages/Login";?
import Login from "../components/pages/Login";
// import Home from "../pages/Home";?
import Home from "../components/pages/Home";
import Customer from "../components/admin/customer/Table";
import Lesson from "../components/admin/lesson/Table";
// import CreateUser from "../pages/CreateUser";
// import ListUsers from "../pages/ListUsers";
// import CalculatorCal from "../components/organs/CalculatorCal";

export const routes = [
{
    layout: AnonymousLayout,
    routes: [
      {
        name: 'login',
        title: 'Login page',
        component: Login,
        path: '/login',
        isPublic: true,
      }
    ]
  },
{
    layout: MainLayout,
    routes: [
      {
        name: 'home',
        title: 'Home page',
        component: Home,
        path: '/'
      },
      {
        name: 'users',
        title: 'Users',
        hasSiderLink: true,
        routes: [
          {
            name: 'list-users',
            title: 'List of users',
            hasSiderLink: true,
            component: Customer,
            path: '/users'
          },
          {
            name: 'create-user',
            title: 'Add user',
            hasSiderLink: true,
            component: Lesson,
            path: '/lesson'
          }
        ]
      }
    ]
  }
];
export const Routes = renderRoutes(routes);