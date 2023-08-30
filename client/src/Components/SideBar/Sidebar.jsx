import { useState } from "react";
import { BiMenuAltLeft } from "react-icons/bi";
export default function Sidebar() {
  const [open, setOpen] = useState(true);
  return (
    <>
      <div
        className={`bg-dark-purple h-screen p-5 duration-300 relative ${
          open ? "w-72" : "w-20"
        }`}
      >
        <div
          className={`flex justify-between items-center ${
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
            className={`text-white text-3xl cursor-pointer`}
            onClick={() => setOpen(!open)}
          />
        </div>
      </div>
    </>
  );
}
