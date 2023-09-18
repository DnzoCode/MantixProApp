import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import {
  COMPLETAR_EVENT,
  EJECUTAR_EVENT,
  GET_EVENTS,
  GET_EVENT_FECHA,
  REPROGRAMAR_EVENT,
} from "../../graphql/Event/EventQl";
import { toast } from "sonner";
import LoadComponent from "../LoadComponent/LoadComponent";
import {
  CERRAR_WORKORDER,
  CREATE_WORKORDER,
} from "../../graphql/WorkOrder/WorkOrder";
import { GET_OWNERS } from "../../graphql/Owners/OwnerQl";
import Select from "react-select";
import { isNullish } from "@apollo/client/cache/inmemory/helpers";
//border-yellow-200
function EventMode({
  mode,
  open,
  eventId,
  tecnicoId,
  refetchData,
  ejecucion,
  dateInfo,
  estadoEvent,
}) {
  const [reprogramar, setReprogramar] = useState({
    id: eventId,
    start: "",
    end: "",
    status: "Reprogramado",
    mensaje_reprogramado: "",
  });
  const {
    data: dataOwners,
    loading: loadingOwners,
    error: errorOwners,
  } = useQuery(GET_OWNERS);

  var fechaActual = new Date();
  var hora = fechaActual.getHours();
  var minutos = fechaActual.getMinutes();
  var segundos = fechaActual.getSeconds();
  var horaFormateada = hora + ":" + minutos + ":" + segundos;

  const titleWorkOrder = {
    programado: `R-${dateInfo}`,
    incidente: `A-${dateInfo}`,
    mantenimiento: `R-${dateInfo}`,
  };

  const [ejecutar, setEjecutar] = useState({
    event_id: eventId,
    status: "En ejecucion",
    work_order:
      ejecucion == "P"
        ? titleWorkOrder.mantenimiento
        : ejecucion == "I"
        ? titleWorkOrder.incidente
        : "",
    hora_inicio: horaFormateada,
    diagnostico: "",
    trabajo_realizado: "",
  });

  const [completar, setCompletar] = useState({
    eventId: eventId,
    status: "Completado",
    owner: null,
    actividades: "",
    causas: "",
    horaFin: horaFormateada,
    observacion: "",
  });

  const [selectedOptionOwner, setSelectedOptionOwner] = useState(null);
  const listOwners = dataOwners?.owners.map((owner) => {
    return {
      value: owner._id,
      label: `${owner.encargado_name} ${owner.encargado_apellido}`,
    };
  });

  const handleSelectChange = (selected) => {
    setSelectedOptionOwner(selected);
    setCompletar({ ...completar, owner: selected.value });
  };

  const [
    reprogramarEvent,
    { loading: loadingReprogramar, error: errorReprogramar, refetch },
  ] = useMutation(REPROGRAMAR_EVENT, {
    refetchQueries: [
      {
        query: GET_EVENTS,
      },
      "events",
    ],
    onCompleted: () => {
      // Llamada al refetch después de una mutación exitosa
      refetchData();
    },
  });

  const [crearWorkOrder, { loading: loadingWorkOrder, error: errorWorkOrder }] =
    useMutation(CREATE_WORKORDER, {
      refetchQueries: [
        {
          query: GET_EVENTS,
        },
        "events",
      ],
      onCompleted: () => {
        // Llamada al refetch después de una mutación exitosa
        refetchData();
      },
    });
  const [
    cerrarWorkOrder,
    { loading: loadingCerrarWorkOrder, error: errorCerrarWorkOrder },
  ] = useMutation(CERRAR_WORKORDER, {
    refetchQueries: [
      {
        query: GET_EVENTS,
      },
      "events",
    ],
    onCompleted: () => {
      // Llamada al refetch después de una mutación exitosa
      refetchData();
    },
  });
  const [ejecutarEvent, { loading: loadingEjecutar, error: errorEjecutar }] =
    useMutation(EJECUTAR_EVENT, {
      refetchQueries: [
        {
          query: GET_EVENTS,
        },
        "events",
      ],
      onCompleted: () => {
        // Llamada al refetch después de una mutación exitosa
        refetchData();
      },
    });

  const [completarEvent, { loading: loadingCompletar, error: errorCompletar }] =
    useMutation(COMPLETAR_EVENT, {
      refetchQueries: [
        {
          query: GET_EVENTS,
        },
        "events",
      ],
      onCompleted: () => {
        // Llamada al refetch después de una mutación exitosa
        refetchData();
      },
    });

  const handleChange = ({ target: { name, value } }) => {
    if (mode == "R") {
      setReprogramar({
        ...reprogramar,
        [name]: value,
      });
    } else if (mode == "E") {
      setEjecutar({
        ...ejecutar,
        [name]: value,
      });
    } else if (mode == "C") {
      setCompletar({
        ...completar,
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
      toast.success("Mantenimiento Reprogramado para " + reprogramar.start);
    } else if (mode == "E") {
      console.log(dateInfo);
      await crearWorkOrder({
        variables: {
          eventId: ejecutar.event_id,
          workOrder: ejecutar.work_order,
          horaInicio: ejecutar.hora_inicio,
          diagnostico: ejecutar.diagnostico,
          trabajoRealizado: ejecutar.trabajo_realizado,
        },
      });
      await ejecutarEvent({
        variables: {
          id: ejecutar.event_id,
          status: ejecutar.status,
          tecnicoId: tecnicoId,
        },
      });
      toast.success("Mantenimiento en ejecucion");
    } else if (mode == "C") {
      await cerrarWorkOrder({
        variables: {
          eventId: completar.eventId,
          owner: completar.owner,
          actividades: completar.actividades,
          causas: completar.causas,
          horaFin: completar.horaFin,
          observacion: completar.observacion,
        },
      });
      await completarEvent({
        variables: {
          id: completar.eventId,
          status: completar.status,
        },
      });
      toast.success("Mantenimiento Completado");
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
              mode == "R"
                ? "border-yellow-200"
                : mode == "E"
                ? "border-blue-300"
                : "border-green-300"
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
            {mode == "E" && estadoEvent != "En ejecucion" && (
              <>
                <p className="font-bold">Ejecutar</p>
                {errorWorkOrder && <p>{errorWorkOrder.message}</p>}
                <form onSubmit={handleSubmit} className="w-full h-auto">
                  <div className="w-full flex justify-around items-end py-2">
                    {!tecnicoId ? (
                      <div className="flex flex-col justify-evenly w-1/2 pr-2">
                        <span className="pl-2">Tecnico Responsable</span>
                        <input
                          type="date"
                          className="p-2 rounded-md bg-gray-200"
                          name="start"
                          value={reprogramar.start}
                          onChange={handleChange}
                        />
                      </div>
                    ) : (
                      <>
                        <div className="flex flex-col justify-evenly w-full">
                          <span className="pl-2">Diagnostico</span>
                          <textarea
                            id="diagnostico"
                            rows="2"
                            className="p-2 rounded-md bg-gray-200 "
                            name="diagnostico"
                            value={ejecutar.diagnostico}
                            onChange={handleChange}
                          ></textarea>
                        </div>
                      </>
                    )}
                  </div>
                  <div className="flex flex-col justify-evenly w-full">
                    <span className="pl-2">Trabajo a realizar</span>
                    <textarea
                      id="trabajo_realizado"
                      rows="2"
                      className="p-2 rounded-md bg-gray-200 "
                      name="trabajo_realizado"
                      value={ejecutar.trabajo_realizado}
                      onChange={handleChange}
                    ></textarea>
                  </div>

                  <div className="flex flex-col justify-evenly w-full py-4">
                    <button className="p-2 bg-blue-400 rounded-lg mx-2">
                      Ejecutar
                    </button>
                  </div>
                </form>
              </>
            )}
            {mode == "C" && (
              <>
                <p className="font-bold">Completar Mantenimiento</p>
                {errorCompletar && <p>{errorCompletar.message}</p>}
                <form onSubmit={handleSubmit} className="w-full h-auto">
                  <div className="w-full flex justify-around items-end py-2"></div>
                  <div className="flex flex-col justify-evenly w-full">
                    <span className="pl-2">Responsable</span>
                    <Select
                      options={listOwners}
                      placeholder={"Selecciona el Owner"}
                      name="owner"
                      value={selectedOptionOwner}
                      onChange={(selected) => handleSelectChange(selected)}
                    />
                  </div>
                  <div className="flex flex-col justify-evenly w-full">
                    <span className="pl-2">Actividades</span>
                    <textarea
                      id="actividades"
                      rows="2"
                      className="p-2 rounded-md bg-gray-200 "
                      name="actividades"
                      value={completar.actividades}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                  <div className="flex flex-col justify-evenly w-full">
                    <span className="pl-2">Causas</span>
                    <textarea
                      id="causas"
                      rows="2"
                      className="p-2 rounded-md bg-gray-200 "
                      name="causas"
                      value={completar.causas}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                  <div className="flex flex-col justify-evenly w-full">
                    <span className="pl-2">Observaciones</span>
                    <textarea
                      id="observacion"
                      rows="2"
                      className="p-2 rounded-md bg-gray-200 "
                      name="observacion"
                      value={completar.observacion}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                  <div className="flex flex-col justify-evenly w-full py-4">
                    <button className="p-2 bg-green-400 rounded-lg mx-2">
                      Completar
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </>
      )}
    </>
  );
}

export default EventMode;
