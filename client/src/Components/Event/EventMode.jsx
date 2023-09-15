import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import {
  GET_EVENTS,
  GET_EVENT_FECHA,
  REPROGRAMAR_EVENT,
} from "../../graphql/Event/EventQl";
import { toast } from "sonner";
import LoadComponent from "../LoadComponent/LoadComponent";
//border-yellow-200
function EventMode({ mode, open, eventId, tecnicoId, dateInfo }) {
  const [reprogramar, setReprogramar] = useState({
    id: eventId,
    start: "",
    end: "",
    status: "Reprogramado",
    mensaje_reprogramado: "",
  });

  const [ejecutar, setEjecutar] = useState({
    id: eventId,
    tecnico_id: tecnicoId ? tecnicoId : null,
    status: "En ejecucion",
  });

  const [
    reprogramarEvent,
    { loading: loadingReprogramar, error: errorReprogramar },
  ] = useMutation(REPROGRAMAR_EVENT, {
    refetchQueries: [
      {
        query: GET_EVENTS,
      },
      "events",
    ],
  });

  const handleChange = ({ target: { name, value } }) => {
    if (mode == "R") {
      setReprogramar({
        ...reprogramar,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (mode == "R") {
      await reprogramarEvent({
        variables: {
          id: reprogramar.id,
          start: reprogramar.start,
          end: reprogramar.end,
          mensajeReprogramado: reprogramar.mensaje_reprogramado,
          status: reprogramar.status,
        },
      });
      toast.success("Event has been created");
    }
  };
  return (
    <>
      {loadingReprogramar ? (
        <LoadComponent />
      ) : (
        <>
          <div
            className={`w-full h-auto p-2  items-center border-4 rounded-lg ${
              mode == "R" ? "border-yellow-200" : "border-blue-300"
            } ${open ? "flex flex-col" : "hidden"}`}
          >
            {mode == "R" && (
              <>
                <p className="font-bold">Reprogramar</p>
                {errorReprogramar && <p>{errorReprogramar.message}</p>}
                <form onSubmit={handleSubmit} className="w-full h-auto">
                  <div className="w-full flex justify-around items-end py-2">
                    <div className="flex flex-col justify-evenly w-1/2 pr-2">
                      <span className="pl-2">Fecha inicio a reprogramar</span>
                      <input
                        type="date"
                        className="p-2 rounded-md bg-gray-200"
                        name="start"
                        value={reprogramar.start}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="flex flex-col justify-evenly w-1/2 pl-2">
                      <span className="pl-2">Fecha final</span>
                      <input
                        type="date"
                        className="p-2 rounded-md bg-gray-200"
                        name="end"
                        value={reprogramar.end}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col justify-evenly w-full">
                    <span className="pl-2">Justificacion</span>
                    <textarea
                      id="mensaje_reprogramado"
                      rows="2"
                      className="p-2 rounded-md bg-gray-200 "
                      name="mensaje_reprogramado"
                      value={reprogramar.mensaje_reprogramado}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                  <div className="flex flex-col justify-evenly w-full py-4">
                    <button className="p-2 bg-yellow-400 rounded-lg mx-2">
                      Reprogramar
                    </button>
                  </div>
                </form>
              </>
            )}
            {mode == "E" && (
              <>
                <p>Ejecutar</p>
              </>
            )}
          </div>
        </>
      )}
    </>
  );
}

export default EventMode;
