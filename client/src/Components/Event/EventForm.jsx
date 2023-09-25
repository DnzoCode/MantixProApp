import { useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import Select from "react-select";
import { GET_TECNICOS } from "../../graphql/Tecnico/TecnicoQl";
import LoadComponent from "../LoadComponent/LoadComponent";
import { GET_MAQUINAS } from "../../graphql/Maquina/MaquinaQl";
import {
  CREATE_EVENTS,
  GET_EVENTS,
  GET_EVENT_FECHA,
} from "../../graphql/Event/EventQl";
import { toast } from "sonner";
import {
  BiBrightness,
  BiAdjust,
  BiMoon,
  BiAlarmAdd,
  BiAlarmOff,
} from "react-icons/bi";
import { REGISTER_DAY } from "../../graphql/Day/DayQl";
import { parse } from "papaparse";
import moment from "moment/moment";

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

  const [modeForm, setModeForm] = useState("Register");

  const [carga, setCarga] = useState(null);
  const [file, setFile] = useState(null);

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

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  const readFile = async (file) => {
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsText(file);
    });
  };

  const parseCsv = (csvData) => {
    const { data } = parse(csvData, { header: true });
    setCarga(data);
    return data.reduce((result, row) => {
      const hasData = Object.values(row).some(
        (value) => (value !== null) & (value !== "")
      );
      if (hasData) {
        result.push({
          start: moment(row.Fecha_Inicio).utc().format("YYYY-MM-DD"),
          end: moment(row.Fecha_Fin).utc().format("YYYY-MM-DD"),
          maquina: row.Nombre_Maquina,
          ejecucion: row.Tipo_Ejecucion,
          turno: row.Turno,
        });
      }
      return result;
    }, []);
  };

  const [createEvent, { loading, error }] = useMutation(CREATE_EVENTS);
  const [
    createDay,
    { loading: loadingRegisterDay, error: errorLoadingRegisterDay },
  ] = useMutation(REGISTER_DAY);

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

  const handleSubmit = async (e, mode) => {
    e.preventDefault();
    if (mode == "Register") {
      await createDay({
        variables: {
          date: new Date(event.start),
          isClosed: false,
        },
      });
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
        refetchQueries: [
          {
            query: GET_EVENTS,
          },
        ],
      });
    } else {
      const csvData = await readFile(file);
      const events = parseCsv(csvData);
      await events.map((event) => {
        const maquinaData = dataMaquinas.maquinas.find(
          (maq) =>
            maq.maquina_name.toUpperCase() === event.maquina.toUpperCase()
        );
        createDay({
          variables: {
            date: new Date(event.start),
            isClosed: false,
          },
        });
        createEvent({
          variables: {
            start: new Date(event.start),
            end: new Date(event.end),
            maquina: maquinaData?._id,
            tecnicoId: null,
            proveedor: null,
            turno: event.turno,
            ejecucion: "Programado",
            mensajeReprogramado: null,
            titulo: "Mantenimiento",
          },
          refetchQueries: [
            {
              query: GET_EVENTS,
            },
          ],
        });
      });
    }

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
      <form onSubmit={(e) => handleSubmit(e, modeForm)}>
        {error && <p>{error.message}</p>}
        <div className="w-full h-auto flex flex-col justify-center items-center">
          <div className="flex w-full items-center justify-end mt-6">
            <button
              type="button"
              className="p-2 bg-orange-400 rounded-lg mr-4 shadow-lg duration-300 px-4 hover:shadow-none"
              onClick={() =>
                modeForm == "Register"
                  ? setModeForm("Masivo")
                  : setModeForm("Register")
              }
            >
              Cargue Masivo
            </button>
            <button
              className="p-2 bg-green-400 rounded-lg shadow-lg duration-300 px-4 mr-8 hover:shadow-none hover:bg-green-600 disabled:bg-green-200 disabled:shadow-none"
              disabled={
                modeForm == "Register"
                  ? !event.start ||
                    !event.end ||
                    loadingTecnicos ||
                    loadingMaquinas
                  : loading || file == null
              }
            >
              Programar Mantenimiento
            </button>
          </div>
          <div className="w-11/12 bg-white rounded-lg shadow-xl mt-12 flex flex-col justify-center p-4">
            {modeForm == "Register" ? (
              <>
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
              </>
            ) : (
              <div className="w-full flex items-center mt-8">
                <label htmlFor="" className="pl-2 pb-2 font-bold">
                  Cargar Archivo
                </label>
                <input
                  type="file"
                  className="bg-gray-200 p-2 rounded-md"
                  onChange={handleFileChange}
                />
              </div>
            )}
          </div>
        </div>
      </form>
    </>
  );
}

export default EventForm;
