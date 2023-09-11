import React from "react";

//border-yellow-200
function EventMode({ mode }) {
  return (
    <>
      <div
        className={`w-full h-auto p-2 flex flex-col items-center border-4 rounded-lg ${
          mode == "R"
            ? "border-yellow-200"
            : mode == "E"
            ? "border-blue-300"
            : "hidden"
        }`}
      >
        {mode == "R" && (
          <>
            <p className="font-bold">Reprogramar</p>

            <div className="w-full flex py-4">
              <div className="flex flex-col justify-evenly w-1/2 pr-2">
                <span className="pl-2">Fecha inicio a reprogramar</span>
                <input type="date" className="p-2 rounded-md bg-gray-200" />
              </div>
              <div className="flex flex-col justify-evenly w-1/2 pl-2">
                <span className="pl-2">Fecha final</span>
                <input type="date" className="p-2 rounded-md bg-gray-200" />
              </div>
            </div>
            <div className="flex flex-col justify-evenly w-full">
              <span className="pl-2">Justificacion</span>
              <textarea
                name=""
                id=""
                rows="2"
                className="p-2 rounded-md bg-gray-200 "
              ></textarea>
            </div>
            <div className="flex flex-col justify-evenly w-full py-4">
              <button className="p-2 bg-yellow-400 rounded-lg mx-2">
                Reprogramar
              </button>
            </div>
          </>
        )}
        {mode == "E" && (
          <>
            <p>Ejecutar</p>
          </>
        )}
      </div>
    </>
  );
}

export default EventMode;
