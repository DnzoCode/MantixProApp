import React from "react";

function CalendarContent({ eventInfo }) {
  const { _id, ejecucion, status, maquina, tecnico_id, proveedor } =
    eventInfo.event._def.extendedProps;

  const statusColors = {
    yellow: "bg-yellow-400",
    blue: "bg-blue-400",
    green: "bg-green-400",
    gray: "bg-gray-400",
  };
  return (
    <>
      <div
        className={`w-full flex flex-col justify-evenly items-center  shadow-2xl rounded-lg p-2 border-2 border-black ${
          status == "Programado"
            ? statusColors.gray
            : status == "Reprogramado"
            ? statusColors.yellow
            : status == "En ejecucion"
            ? statusColors.blue
            : status == "Completado"
            ? statusColors.green
            : "bg-white"
        }`}
      >
        <div className="overflow-auto w-full flex flex-col justify-center items-center">
          <div className="flex flex-col justify-center items-center border-b-2 w-full mb-2">
            <span className="whitespace-normal font-bold text-center">
              {maquina.maquina_name}
            </span>
            <span className="bg-slate-700 p-1 rounded-md text-white mb-2">
              {maquina.maquina_location.location_name}
            </span>
          </div>
          <div className="w-full flex flex-col justify-end items-start">
            <span>
              {tecnico_id.tecnico_name} {tecnico_id.tecnico_apellido}
            </span>
            <span className="font-bold">{status}</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default CalendarContent;
