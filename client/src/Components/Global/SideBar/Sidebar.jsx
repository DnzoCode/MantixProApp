import { useState } from "react";
import {
  BiMenuAltLeft,
  BiSolidDashboard,
  BiSolidCalendar,
  BiSolidWrench,
  BiSolidGroup,
  BiSolidBox,
  BiSolidUserBadge,
} from "react-icons/bi";
import { Link, useLocation } from "react-router-dom";
export default function Sidebar() {
  const [open, setOpen] = useState(true);

  const location = useLocation();
  console.log(location.pathname);
  const items = [
    {
      icon: <BiSolidDashboard className="text-2xl mr-2" />,
      title: "Dashboard",
      active: true,
      to: "/dashboard",
    },
    {
      icon: <BiSolidCalendar className="text-2xl mr-2" />,
      title: "Calendar",
      active: false,
      to: "/calendar",
    },
    {
      icon: <BiSolidWrench className="text-2xl mr-2" />,
      title: "Registrar Mantenimiento",
      active: false,
      to: "/mantenimiento/add",
    },
    {
      icon: <BiSolidGroup className="text-2xl mr-2" />,
      title: "Usuarios",
      active: false,
      to: "/users",
    },
    {
      icon: <BiSolidBox className="text-2xl mr-2" />,
      title: "Maquinas",
      active: false,
      to: "/maquinas",
    },
    {
      icon: <BiSolidUserBadge className="text-2xl mr-2" />,
      title: "Tecnicos",
      active: false,
      to: "/tecnicos",
    },
  ];

  return (
    <>
      <div
        className={`bg-dark-purple h-screen flex flex-col justify-stretch duration-300 relative ${
          open ? "w-72" : "w-20"
        }`}
      >
        <div
          className={`flex justify-between items-center p-5 ${
            open ? "flex-row" : "flex-col-reverse"
          }`}
        >
          <div className="flex items-center">
            <img
              src="MantixLogo.png"
              width={70}
              alt="LogoMantix"
              title="LogoMantix"
            />
            <span
              className={`text-white text-xl font-bold ${
                open ? "block" : "hidden"
              }`}
            >
              Mantix
            </span>
          </div>
          <BiMenuAltLeft
            className={`text-gray-400 text-3xl cursor-pointer`}
            onClick={() => setOpen(!open)}
          />
        </div>

        <div className={`flex flex-col justify-start `}>
          {items.map((item) => (
            <Link
              to={item.to}
              key={item.icon}
              className={`flex w-full ${
                location.pathname == item.to ? "text-white" : "text-gray-500"
              } h-auto items-center cursor-pointer duration-150 hover:text-white`}
            >
              <div
                className={`w-1 bg-white rounded-tr-3xl rounded-br-3xl h-6 ${
                  location.pathname == item.to ? "flex" : "hidden"
                }`}
              ></div>
              <div
                className={`flex items-center p-4 w-full ${
                  !open ? "items-center justify-center " : ""
                }`}
              >
                {item.icon}
                <span
                  className={`${!open ? "hidden" : "block"} whitespace-normal`}
                >
                  {item.title}
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="w-full flex flex-col justify-end items-center bottom-0">
          <div className="flex flex-col items-center bg-gray-400 bg-opacity-10 m-4 rounded-md shadow-xl backdrop-blur-lg h-auto">
            <div
              className={`my-3 ${
                !open ? "hidden" : "flex flex-col justify-center items-center"
              }`}
            >
              <span className="font-bold text-white mb-2">Mantix beta app</span>
              <p className="text-justify px-2 text-white font-light text-sm">
                Aun estoy en desarrollo. Pronto tendre mas funcionalidades
              </p>
            </div>
            <img
              className={`object-contain shadow-lg ${!open ? "p-2" : "mb-4 "}`}
              src="beta-app.png"
              width={200}
              alt="LogoMantix"
              title="LogoMantix"
            />
          </div>
        </div>
        <div
          className={`h-full flex flex-col items-end justify-end duration-150 ${
            open ? "pb-4 pr-8" : "pb-4 pr-1 text-xs"
          } `}
        >
          <span className="text-center text-gray-400 ">V beta-0.0.1</span>
        </div>
      </div>
    </>
  );
}
