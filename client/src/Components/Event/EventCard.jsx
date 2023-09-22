import React, { useState } from "react";
import { BiCaretDown, BiSolidHandLeft } from "react-icons/bi";
import EventMode from "./EventMode";
function EventCard({ eventData, dateString, refetchData }) {
  const [openDialog, setOpenDialog] = useState({});
  const [mode, setMode] = useState("");
  const [openFunction, setOpenFunction] = useState(false);
  console.log(eventData);
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
    modeParameter == "R"
      ? setMode("R")
      : modeParameter == "E"
      ? setMode("E")
      : setMode("C");
    openFunction ? setOpenFunction(false) : setOpenFunction(true);
  };

  const eventosTurnoA = [];
  const eventosTurnoB = [];
  const eventosTurnoK = [];

  // Clasifica los eventos en los arrays correspondientes según el turno.
  eventData.forEach((event) => {
    if (event.turno == "A") {
      eventosTurnoA.push(event);
    } else if (event.turno == "B") {
      eventosTurnoB.push(event);
    } else if (event.turno == "K") {
      eventosTurnoK.push(event);
    }
  });

  // Luego, mapea los eventos en el orden deseado (A, B y K).
  const eventosOrdenados = [
    ...eventosTurnoA,
    ...eventosTurnoB,
    ...eventosTurnoK,
  ];

  const allEventCompleted = !eventosOrdenados?.every(
    (event) => event.status == "Completado"
  );

  return (
    <>
      <div className="flex justify-between mb-8 px-12">
        <h1 className="font-extrabold text-3xl">{dateString}</h1>

        <button
          className="bg-green-400 rounded-lg text-white p-2 disabled:bg-green-200"
          disabled={allEventCompleted}
        >
          Cerrar Dia
        </button>
      </div>
      <div className="w-full grid grid-cols-2 gap-4 px-4  h-auto">
        {eventosOrdenados?.map((event, index) => (
          <div
            className="w-full bg-white shadow-lg rounded-xl flex flex-col items-center h-auto border-2"
            key={index}
          >
            <div
              className={`w-full flex justify-evenly items-center px-2 py-1 cursor-pointer rounded-tl-lg rounded-tr-lg ${
                event.status == "Programado"
                  ? statusColors.gray
                  : event.status == "Reprogramado"
                  ? statusColors.yellow
                  : event.status == "En ejecucion"
                  ? statusColors.blue
                  : event.status == "Completado"
                  ? statusColors.green
                  : "bg-white"
              }`}
              onClick={() => handleOpenDialog(event._id)}
            >
              <span
                className={`font-semibold ${
                  openDialog[event._id] ? "hidden" : "block"
                }`}
              >
                {event.maquina?.maquina_name}
              </span>
              <span>{event.status}</span>
              <div
                className={` ${
                  openDialog[event._id]
                    ? "flex flex-row items-center justify-between"
                    : "flex flex-col"
                }`}
              >
                <span className="text-left text-sm ">Turno</span>
                <span className="font-extrabold text-2xl text-right ml-2">
                  {event.turno}
                </span>
              </div>
              <BiCaretDown
                className={`text-2xl duration-150 ${
                  openDialog[event._id] ? "rotate-180" : "rotate-0"
                }`}
              />
            </div>
            <div
              className={`w-full justify-evenly  ${
                openDialog[event._id] ? "flex flex-col p-4" : "hidden "
              }`}
            >
              <div className="w-full flex justify-center mb-4">
                <span className="font-extrabold text-xl">
                  {event.maquina?.maquina_name}
                </span>
              </div>
              <div className="w-full flex justify-evenly">
                <span className="font-extrabold">
                  {event.tecnico_id?.tecnico_name}{" "}
                  {event.tecnico_id?.tecnico_apellido}
                </span>
                <span className="font-extrabold bg-green-300 p-1 rounded-lg">
                  {event.maquina?.maquina_location.location_name}
                </span>
              </div>
              <div className="w-full flex justify-evenly my-4">
                {event.status != "Completado" && (
                  <button
                    className="bg-yellow-300 w-1/2 mt-4 p-2 mx-2 rounded-md"
                    onClick={() => {
                      handleChangeMode("R");
                    }}
                  >
                    Reprogramar
                  </button>
                )}
                {event.status != "En ejecucion" &&
                  event.status != "Completado" && (
                    <button
                      className="bg-blue-600 w-1/2 mt-4 p-2 mx-2 rounded-md text-white"
                      onClick={() => {
                        handleChangeMode("E");
                      }}
                    >
                      Ejecutar
                    </button>
                  )}
                {event.status != "Programado" &&
                  event.status != "Completado" &&
                  event.status != "Reprogramado" && (
                    <button
                      className="bg-green-400 w-1/2 mt-4 p-2 mx-2 rounded-md text-white"
                      onClick={() => {
                        handleChangeMode("C");
                      }}
                    >
                      Completar
                    </button>
                  )}
              </div>
              {mode ? (
                <EventMode
                  mode={mode}
                  open={openFunction}
                  eventId={event._id}
                  tecnicoId={event.tecnico_id?._id}
                  dateInfo={dateString}
                  refetchData={refetchData}
                  ejecucion={event.ejecucion}
                  estadoEvent={event.status}
                />
              ) : (
                <></>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default EventCard;
