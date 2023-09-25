import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import {
  COMPLETAR_EVENT,
  EJECUTAR_EVENT,
  EVENT_TEC,
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
import { GET_TECNICOS } from "../../graphql/Tecnico/TecnicoQl";

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
  const {
    data: dataTecnicos,
    loading: loadingTecnicos,
    error: errorTecnicos,
  } = useQuery(GET_TECNICOS);

  const listTecnicos = dataTecnicos?.tecnicos.map((tecnico) => {
    return {
      value: tecnico._id,
      label: `${tecnico.tecnico_name} ${tecnico.tecnico_apellido}`,
    };
  });
  const [selectedOptionTecnico, setSelectedOptionTecnico] = useState(null);
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
    tecnicoId: "",
  });

  const handleSelectChangeTec = (selected, selectNumber) => {
    setSelectedOptionTecnico(selected);
    setEjecutar({ ...ejecutar, tecnicoId: selected.value });
  };

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
    { loading: loadingReprogramar, error: errorReprogramar },
  ] = useMutation(REPROGRAMAR_EVENT);

  const [crearWorkOrder, { loading: loadingWorkOrder, error: errorWorkOrder }] =
    useMutation(CREATE_WORKORDER);
  const [
    cerrarWorkOrder,
    { loading: loadingCerrarWorkOrder, error: errorCerrarWorkOrder },
  ] = useMutation(CERRAR_WORKORDER);
  const [ejecutarEvent, { loading: loadingEjecutar, error: errorEjecutar }] =
    useMutation(EJECUTAR_EVENT);

  const [completarEvent, { loading: loadingCompletar, error: errorCompletar }] =
    useMutation(COMPLETAR_EVENT);
  const [eventTec, { loading: loadingEventTec, error: errorEventTec }] =
    useMutation(EVENT_TEC);

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
      loadingReprogramar;
      await reprogramarEvent({
        variables: {
          id: reprogramar.id,
          start: reprogramar.start,
          end: reprogramar.end,
          mensajeReprogramado: reprogramar.mensaje_reprogramado,
          status: reprogramar.status,
        },
        refetchQueries: [
          {
            query: GET_EVENTS,
          },
        ],
      });
      toast.success("Mantenimiento Reprogramado para " + reprogramar.start);
    } else if (mode == "E") {
      loadingWorkOrder;
      await crearWorkOrder({
        variables: {
          eventId: ejecutar.event_id,
          workOrder: ejecutar.work_order,
          horaInicio: ejecutar.hora_inicio,
          diagnostico: ejecutar.diagnostico,
          trabajoRealizado: ejecutar.trabajo_realizado,
        },
      });
      await eventTec({
        variables: {
          id: ejecutar.event_id,
          tecnicoId: ejecutar.tecnicoId,
        },
      });
      loadingEjecutar;
      await ejecutarEvent({
        variables: {
          id: ejecutar.event_id,
          status: ejecutar.status,
          tecnicoId: tecnicoId,
        },
        refetchQueries: [
          {
            query: GET_EVENTS,
          },
        ],
      });

      toast.success("Mantenimiento en ejecucion");
    } else if (mode == "C") {
      loadingCompletar;
      await completarEvent({
        variables: {
          id: completar.eventId,
          status: completar.status,
        },
        refetchQueries: [
          {
            query: GET_EVENTS,
          },
        ],
      });
      loadingCerrarWorkOrder;
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
      toast.success("Mantenimiento Completado");
    }
  };
  return (
    <>
      {loadingReprogramar ||
      loadingCompletar ||
      loadingWorkOrder ||
      loadingEjecutar ||
      loadingCerrarWorkOrder ||
      loadingCompletar ? (
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
            {mode == "E" &&
              estadoEvent != "En ejecucion" &&
              estadoEvent != "Completado" && (
                <>
                  <p className="font-bold">Ejecutar</p>
                  {errorWorkOrder && <p>{errorWorkOrder.message}</p>}
                  {errorEjecutar && <p>{errorEjecutar.message}</p>}
                  <form onSubmit={handleSubmit} className="w-full h-auto">
                    <div className="w-full flex justify-around items-end py-2">
                      {!tecnicoId ? (
                        <div className="flex flex-col justify-evenly w-1/2 pr-2">
                          <span className="pl-2">Tecnico Responsable</span>
                          <Select
                            options={listTecnicos}
                            placeholder={"Selecciona el tecnico responsable"}
                            name="tecnico_id"
                            value={selectedOptionTecnico}
                            onChange={(selected) =>
                              handleSelectChangeTec(selected)
                            }
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
                {errorCerrarWorkOrder && <p>{errorCerrarWorkOrder.message}</p>}
                {errorOwners && <p>{errorOwners.message}</p>}

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
