import { useState, useEffect } from "react";
import { NavLinks } from "../particles/Data";
import { List } from "../atoms/List";
import { NavLink } from "react-router-dom";

import { Link } from "react-router-dom";
import { Text } from "../atoms/Text";
import { ConfigProvider } from "antd";
import { useSelector } from "react-redux";
import MyCustomImage from "../../assets/logoAndIcon/logo.png";
import { getGeneratedNameForNode } from "typescript";

import Anchor from "antd/es/anchor/Anchor";

const NavBar = () => {
  const ProName = useSelector((state) => state.system.userData?.name);

  const [open, setOpen] = useState(false);
  const [proopen, setProOpen] = useState(false);

  const [navBarColor, setNavBarColor] = useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };

  const listenScrollEvent = () => {
    window.scrollY > 10 ? setNavBarColor(true) : setNavBarColor(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", listenScrollEvent);
    return () => {
      window.removeEventListener("scroll", listenScrollEvent);
    };
  }, []);

  //   const scroll = (url) => {
  //     const section = document.querySelector(url);
  //     section.scrollIntoView({ movement: "smooth", start: "base" });
  //   };

  return (
    <ConfigProvider
      theme={{
        token: {
          // Seed Token
          colorPrimary: "#01796f",
          borderRadius: 2,

          // Alias Token
          colorBgContainer: "#f6ffed",
        },
      }}
    >
      <header className="w-full h-auto bg-transparent overflow-x-hidden fixed z-50 top-0 left-0">
        <nav
          className={`w-full lg:h-24 md:h-28 h-20 ${
            navBarColor ? "bg-zinc-900" : " bg-transparent"
          } lg:px-16 md:px-9 px-8 flex justify-between items-center`}
        >
          <Link
            to={`/`}
            className="font-extrabold flex items-center relative md:text-2xl text-lg"
          >
            <img
              src={MyCustomImage}
              alt="My Custom Image"
              className="w-6 h-6 md:w-8 md:h-8 absolute -top-5 md:left-2 left-3"
            />
            <span className="text-white">Body</span>
            <span className="bg-gradient-to-r from-[#00c6ac] to-bodyhack bg-clip-text text-transparent">
              Hacker
            </span>
          </Link>
          <div className="lg:flex hidden items-center h-full gap-20">
            <ul className="flex items-center justify-center h-full gap-4 relative before:w-full before:h-0.5 before:absolute before:bottom-0 before:left-0 ">
              {/* {NavLinks.map((navlink, index) => (
              <List className="w-full text-base" key={index}></List>
            ))} */}

              <Anchor
                direction="horizontal"
                className="text-white  "
                items={[
                  // {
                  //   key: 1,
                  //   href: "#1",
                  //   title: (
                  //     <text className="text-white hover:text-black  focus:text-red-500">
                  //       haha
                  //     </text>
                  //   ),
                  // },

                  ...NavLinks.map((navlink, index) => ({
                    key: navlink.url,
                    href: navlink.url,
                    title: (
                      <List className="w-full text-base h-8" key={index}>
                        <text
                          className={`  relative inline-block  px-4 whitespace-nowrap text-white focus:text-black uppercase text-sm font-bold transition-all duration-200 hover:text-amber-500 before:w-0 before:h-0.5 before:bg-gradient-to-r from-red-500 to-amber-500 before:absolute before:-bottom-[2.93rem] before:left-0 before:transition-all before:duration-200 before:ease-in hover:before:left-0.5 `}
                        >
                          {navlink.name}
                        </text>
                      </List>
                    ),
                  })),
                  ProName
                    ? {
                        key: "",
                        href: "",
                        title: (
                          <List className="w-full text-base h-8" key={20}>
                            <NavLink
                              to={"/profile"}
                              className={`  relative inline-block  px-4 whitespace-nowrap text-white focus:text-black uppercase text-sm font-bold transition-all duration-200 hover:text-amber-500 before:w-0 before:h-0.5 before:bg-gradient-to-r from-red-500 to-amber-500 before:absolute before:-bottom-[2.93rem] before:left-0 before:transition-all before:duration-200 before:ease-in hover:before:left-0.5 `}
                            >
                              {ProName}
                            </NavLink>
                          </List>
                        ),
                      }
                    : {
                        key: "",
                        href: "",
                        title: (
                          <List className="w-full text-base h-8" key={20}>
                            <NavLink
                              to={"/profile"}
                              className={`  relative inline-block  px-4 whitespace-nowrap text-white uppercase text-sm font-bold transition-all duration-200 hover:text-amber-500 before:w-0 before:h-0.5 before:bg-gradient-to-r from-red-500 to-amber-500 before:absolute before:-bottom-[2.93rem] before:left-0 before:transition-all before:duration-200 before:ease-in hover:before:left-0.5 `}
                            >
                              Нэвтрэх
                            </NavLink>
                          </List>
                        ),
                      },
                ]}
              ></Anchor>
              <Anchor direction="horizontal"></Anchor>
            </ul>
          </div>
          <div
            className="hamburger lg:hidden flex text-white cursor-pointer"
            onClick={handleToggle}
          >
            {/* <CirclesFour size={30} color="currentColor" weight="light" /> */}
          </div>
        </nav>

        {/* Mobile Nav  */}
        <nav
          className={`flex justify-end lg:hidden h-screen w-full bg-gray-950/90 fixed top-0  ${
            open ? "right-0" : "-right-[120vw]"
          } transition-all duration-500 ease-out`}
        >
          <div
            className={`w-full md:w-[50%] h-screen bg-zinc-900 flex flex-col justify-between items-center relative ${
              open ? "right-0" : "-right-[120vw]"
            } transition-all duration-500 ease-out delay-300`}
          >
            <section className="w-full px-4 py-6 flex flex-col gap-16">
              <div className="w-full flex pt-5 px-4 justify-between items-center">
                <Link to={`/`} className="font-extrabold text-2xl">
                  <span className=" text-white ">Body</span>
                  <span className=" text-amber-500">Hacker</span>
                </Link>
                <div
                  className="hamburger text-white cursor-pointer"
                  onClick={handleToggle}
                >
                  {/* <ArrowCircleRight size={25} color="currentColor" weight="light" /> */}
                </div>
              </div>
              <ul className="flex flex-col gap-3 pl-5">
                {NavLinks.map((navlink, index) => (
                  <List className="w-full text-base" key={index}>
                    <NavLink
                      to={navlink.url}
                      onClick={handleToggle}
                      className={`relative overflow-hidden inline-block text-white before:w-full before:h-0.5 before:bg-color2 before:absolute before:bottom-0 before:-left-full before:rounded-full before:transition-all before:duration-200 before:ease-in hover:before:left-0 `}
                    >
                      {navlink.name}
                    </NavLink>
                  </List>
                ))}
              </ul>
            </section>
          </div>
        </nav>
      </header>
    </ConfigProvider>
  );
};

export default NavBar;
