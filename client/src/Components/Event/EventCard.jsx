import React, { useState } from "react";
import { BiCaretDown, BiSolidHandLeft } from "react-icons/bi";
import EventMode from "./EventMode";
function EventCard({ eventInfo, dateString }) {
  const [openDialog, setOpenDialog] = useState({});
  const [mode, setMode] = useState("");
  const [openFunction, setOpenFunction] = useState(false);

  const handleOpenDialog = (eventId) => {
    setOpenDialog((prevState) => ({
      ...prevState,
      [eventId]: !prevState[eventId],
    }));
  };
  const statusColors = {
    yellow: "bg-yellow-400",
    blue: "bg-blue-400",
    green: "bg-green-400",
    gray: "bg-gray-400",
  };

  const handleChangeMode = (modeParameter) => {
    modeParameter == "R" ? setMode("R") : setMode("E");
    openFunction ? setOpenFunction(false) : setOpenFunction(true);
    console.log(openFunction);
  };
  return (
    <>
      <div className="w-full bg-white shadow-lg rounded-xl flex flex-col items-center h-auto border-2">
        <div
          className={`w-full flex justify-evenly items-center px-2 py-1 cursor-pointer rounded-tl-lg rounded-tr-lg ${
            eventInfo.status == "Programado"
              ? statusColors.gray
              : eventInfo.status == "Reprogramado"
              ? statusColors.yellow
              : eventInfo.status == "En ejecucion"
              ? statusColors.blue
              : eventInfo.status == "Completado"
              ? statusColors.green
              : "bg-white"
          }`}
          onClick={() => handleOpenDialog(eventInfo._id)}
        >
          <span
            className={`font-semibold ${
              openDialog[eventInfo._id] ? "hidden" : "block"
            }`}
          >
            {eventInfo.maquina?.maquina_name}
          </span>
          <span>{eventInfo.status}</span>
          <div
            className={` ${
              openDialog[eventInfo._id]
                ? "flex flex-row items-center justify-between"
                : "flex flex-col"
            }`}
          >
            <span className="text-left text-sm ">Turno</span>
            <span className="font-extrabold text-2xl text-right ml-2">
              {eventInfo.turno}
            </span>
          </div>
          <BiCaretDown
            className={`text-2xl duration-150 ${
              openDialog[eventInfo._id] ? "rotate-180" : "rotate-0"
            }`}
          />
        </div>
        <div
          className={`w-full justify-evenly  ${
            openDialog[eventInfo._id] ? "flex flex-col p-4" : "hidden "
          }`}
        >
          <div className="w-full flex justify-center mb-4">
            <span className="font-extrabold text-xl">
              {eventInfo.maquina?.maquina_name}
            </span>
          </div>
          <div className="w-full flex justify-evenly">
            <span className="font-extrabold">
              {eventInfo.tecnico_id?.tecnico_name}{" "}
              {eventInfo.tecnico_id?.tecnico_apellido}
            </span>
            <span className="font-extrabold bg-green-300 p-1 rounded-lg">
              {eventInfo.maquina?.maquina_location.location_name}
            </span>
          </div>
          <div className="w-full flex justify-evenly my-4">
            <button
              className="bg-yellow-300 w-1/2 mt-4 p-2 mx-2 rounded-md"
              onClick={() => {
                handleChangeMode("R");
              }}
            >
              Reprogramar
            </button>
            <button
              className="bg-blue-600 w-1/2 mt-4 p-2 mx-2 rounded-md text-white"
              onClick={() => {
                handleChangeMode("E");
              }}
            >
              Ejecutar
            </button>
          </div>
          {mode ? (
            <EventMode
              mode={mode}
              open={openFunction}
              eventId={eventInfo._id}
              tecnicoId={eventInfo.tecnico_id?._id}
              dateInfo={dateString}
            />
          ) : (
            <EventMode
              mode={mode}
              open={openFunction}
              eventId={eventInfo._id}
              tecnicoId={eventInfo.tecnico_id?._id}
              dateInfo={dateString}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default EventCard;
