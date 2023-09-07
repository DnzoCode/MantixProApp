import React, { useState } from "react";
import { BiCaretDown, BiSolidHandLeft } from "react-icons/bi";
function EventCard() {
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => {
    openDialog ? setOpenDialog(false) : setOpenDialog(true);
  };

  return (
    <>
      <div className="w-full bg-white shadow-lg rounded-xl flex flex-col items-center h-auto">
        <div
          className={`w-full flex justify-evenly items-center bg-green-300 px-2 py-1 cursor-pointer`}
          onClick={handleOpenDialog}
        >
          <span className={`font-semibold ${openDialog ? "hidden" : "block"}`}>
            Maquina De Lavado Tercer Piso
          </span>
          <span>Completado</span>
          <div
            className={` ${
              openDialog
                ? "flex flex-row items-center justify-between"
                : "flex flex-col"
            }`}
          >
            <span className="text-left text-sm ">Turno</span>
            <span className="font-extrabold text-2xl text-right ml-2">A</span>
          </div>
          <BiCaretDown
            className={`text-2xl duration-150 ${
              openDialog ? "rotate-180" : "rotate-0"
            }`}
          />
        </div>
        <div
          className={`w-full justify-evenly  ${
            openDialog ? "flex flex-col p-4" : "hidden "
          }`}
        >
          <div className="w-full flex justify-center mb-4">
            <span className="font-extrabold text-xl">
              Maquina De Lavado Tercer Piso
            </span>
          </div>
          <div className="w-full flex justify-evenly">
            <span className="font-extrabold">
              Maquina De Lavado Tercer Piso
            </span>
            <span className="font-extrabold bg-green-300 p-1 rounded-lg">
              Make And Pack
            </span>
          </div>
          <div className="w-full flex justify-evenly my-4">
            <button className="bg-yellow-300 w-1/2 mt-4 p-2 mx-2 rounded-md">
              Reprogramar
            </button>
            <button className="bg-blue-600 w-1/2 mt-4 p-2 mx-2 rounded-md text-white">
              Ejecutar
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default EventCard;
