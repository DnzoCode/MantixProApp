import { useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import Select from "react-select";
import { GET_TECNICOS } from "../../graphql/Tecnico/TecnicoQl";
import LoadComponent from "../LoadComponent/LoadComponent";
import { GET_MAQUINAS } from "../../graphql/Maquina/MaquinaQl";
import { CREATE_EVENTS, GET_EVENTS } from "../../graphql/Event/EventQl";
import { toast } from "sonner";
import {
  BiBrightness,
  BiAdjust,
  BiMoon,
  BiAlarmAdd,
  BiAlarmOff,
} from "react-icons/bi";
function EventForm() {
  const {
    data: dataTecnicos,
    loading: loadingTecnicos,
    error: errorTecnicos,
  } = useQuery(GET_TECNICOS);
  const {
    data: dataMaquinas,
    loading: loadingMaquinas,
    error: errorMaquinas,
  } = useQuery(GET_MAQUINAS);

  const [event, setEvent] = useState({
    start: "",
    end: "",
    maquina: "",
    tecnicoId: "",
    proveedor: null,
    turno: "",
    ejecucion: "",
    mensajeReprogramado: null,
  });
  const [selectedOptionMaquina, setSelectedOptionMaquina] = useState(null);
  const [selectedOptionTecnico, setSelectedOptionTecnico] = useState(null);

  const [createEvent, { loading, error }] = useMutation(CREATE_EVENTS, {
    refetchQueries: [
      {
        query: GET_EVENTS,
      },
      "events",
    ],
  });
  const listTecnicos = dataTecnicos?.tecnicos.map((tecnico) => {
    return {
      value: tecnico._id,
      label: `${tecnico.tecnico_name} ${tecnico.tecnico_apellido}`,
    };
  });
  const listMaquinas = dataMaquinas?.maquinas.map((maquina) => {
    return {
      value: maquina._id,
      label: `${maquina.numero_serial} - ${maquina.maquina_name}`,
    };
  });
  const handleSelectChange = (selected, selectNumber) => {
    if (selectNumber === 1) {
      setSelectedOptionMaquina(selected);
      setEvent({ ...event, maquina: selected.value });
    } else if (selectNumber === 2) {
      setSelectedOptionTecnico(selected);
      setEvent({ ...event, tecnicoId: selected.value });
    }
  };

  const handleChange = ({ target: { name, value } }) => {
    setEvent({
      ...event,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createEvent({
      variables: {
        start: new Date(event.start),
        end: new Date(event.end),
        maquina: event.maquina,
        tecnicoId: event.tecnicoId,
        proveedor: event.proveedor,
        turno: event.turno,
        ejecucion: event.ejecucion,
        mensajeReprogramado: event.mensajeReprogramado,
        titulo: "Mantenimiento",
      },
    });
    toast.success("Event has been created");
    const newEvent = {
      start: "",
      end: "",
      maquina: "",
      tecnicoId: "",
      proveedor: null,
      turno: "",
      ejecucion: "",
      mensajeReprogramado: null,
    };
    setEvent(newEvent);
    setSelectedOptionMaquina(null);
    setSelectedOptionTecnico(null);
  };

  error ? toast.error(error.message) : null;

  if ((loadingTecnicos && loadingMaquinas) || loading) {
    // Mostrar el componente de carga aquí
    return <LoadComponent />;
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        {error && <p>{error.message}</p>}
        <div className="w-full h-auto flex flex-col justify-center items-center">
          <div className="flex w-full items-center justify-end mt-6">
            <button className="p-2 bg-orange-400 rounded-lg mr-4 shadow-lg duration-300 px-4 hover:shadow-none">
              Cargue Masivo
            </button>
            <button
              className="p-2 bg-green-400 rounded-lg shadow-lg duration-300 px-4 mr-8 hover:shadow-none hover:bg-green-600 disabled:bg-green-200 disabled:shadow-none"
              disabled={
                !event.start || !event.end || loadingTecnicos || loadingMaquinas
              }
            >
              Programar Mantenimiento
            </button>
          </div>
          <div className="w-11/12 bg-white rounded-lg shadow-xl mt-12 flex flex-col justify-center p-4">
            <div className="w-full flex items-center">
              <div className="flex flex-col w-1/2 pr-2">
                <Select
                  options={listTecnicos}
                  placeholder={"Selecciona el tecnico responsable"}
                  name="tecnico_id"
                  value={selectedOptionTecnico}
                  onChange={(selected) => handleSelectChange(selected, 2)}
                />
              </div>
              <div className="flex flex-col w-1/2 pl-2">
                <Select
                  options={listMaquinas}
                  placeholder={
                    "Selecciona la Maquina para programar mantenimiento"
                  }
                  name="maquina"
                  value={selectedOptionMaquina}
                  onChange={(selected) => handleSelectChange(selected, 1)}
                />
              </div>
            </div>
            <div className="w-full flex flex-col items-center justify-evenly my-8">
              <h1 className="font-bold mb-4">Turno del Mantenimiento</h1>
              <div className="flex items-center justify-around w-3/4 border-b-4">
                <div className="input-container">
                  <input
                    type="radio"
                    name="turno"
                    id="turnoA"
                    className="radio-button"
                    value={"A"}
                    onChange={handleChange}
                  />
                  <div className="radio-title">
                    <BiBrightness className="icon" />
                    <label htmlFor="turnoA">A</label>
                  </div>
                </div>
                <div className="input-container">
                  <input
                    type="radio"
                    name="turno"
                    id="turnoA"
                    className="radio-button"
                    value={"B"}
                    onChange={handleChange}
                  />
                  <div className="radio-title">
                    <BiAdjust className="icon" />

                    <label htmlFor="turnoA">B</label>
                  </div>
                </div>
                <div className="input-container">
                  <input
                    type="radio"
                    name="turno"
                    id="turnoA"
                    className="radio-button"
                    value={"K"}
                    onChange={handleChange}
                  />
                  <div className="radio-title">
                    <BiMoon className="icon" />

                    <label htmlFor="turnoA">K</label>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full flex flex-col items-center justify-evenly my-8">
              <h1 className="font-bold">Tipo mantenimiento</h1>
              <div className="flex items-center justify-around w-3/4 border-b-4">
                <div className="input-container large">
                  <input
                    type="radio"
                    name="ejecucion"
                    id="ejecucionP"
                    value={"P"}
                    onChange={handleChange}
                    className="radio-button"
                  />
                  <div className="radio-title large-text">
                    <BiAlarmAdd className="icon" />
                    <label htmlFor="turnoA" className="large-text">
                      Programado
                    </label>
                  </div>
                </div>
                <div className="input-container large">
                  <input
                    type="radio"
                    name="ejecucion"
                    id="ejecucionI"
                    value={"I"}
                    onChange={handleChange}
                    className="radio-button"
                  />
                  <div className="radio-title">
                    <BiAlarmOff className="icon" />

                    <label htmlFor="turnoA" className="large-text">
                      Incidente
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full flex items-center">
              <div className="flex flex-col w-1/2 pr-2">
                <label htmlFor="" className="pl-2 pb-2 font-bold">
                  Fecha Inicio
                </label>
                <input
                  type="date"
                  name="start"
                  id="start"
                  className="bg-gray-200 p-2 rounded-md"
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col w-1/2 pl-2">
                <label htmlFor="" className="pl-2 pb-2 font-bold">
                  Fecha Fin
                </label>
                <input
                  type="date"
                  name="end"
                  id="end"
                  className="bg-gray-200 p-2 rounded-md"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default EventForm;
