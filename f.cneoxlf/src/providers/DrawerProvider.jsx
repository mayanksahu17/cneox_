import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import { Logo } from "../assets";
import { useNavigate } from "react-router-dom";
import routes from "../constants/route";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { useState } from "react";
import clsx from "clsx";

export default function DrawerProvider({ toggleDrawer, isOpen }) {
  const handleNavigate = useNavigate();
  const [activeRoute, setActiveRoute] = useState("");

  const handleRoute = (route) => {
    handleNavigate(route);
  };

  return (
    <Drawer
      open={isOpen}
      onClose={toggleDrawer}
      direction="left"
      className="w-full h-full"
      size="260px"
    >
      <div className="bg-primary w-full h-full p-3 flex flex-col items-start">
        <div className="cursor-pointer h-14 p-2 w-14 rounded-full bg-white flex items-center justify-center">
          <img
            src={Logo}
            alt="Logo Image"
            className="w-full h-full object-contain"
            onClick={() => handleNavigate("/dashboard")}
          />
        </div>
        <div className="flex flex-col items-center space-y-6 w-full mt-10 overflow-y-auto">
          {routes.map(({ icon, name, route, childNavs }, index) => (
            <>
              <div
                key={index}
                className="w-full flex items-center justify-between px-[15px] cursor-pointer"
                onClick={() => handleRoute(route)}
              >
                <div className="w-full flex items-center space-x-4 ">
                  <img
                    src={icon}
                    alt={name}
                    className="w-6 h-auto cursor-pointer"
                  />
                  <p className="text-white">{name}</p>
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
    </Drawer>
  );
}
