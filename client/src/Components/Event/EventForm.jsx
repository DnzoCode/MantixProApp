import { useQuery } from "@apollo/client";
import React from "react";
import Select from "react-select";
import { GET_TECNICOS } from "../../graphql/Tecnico/TecnicoQl";
import LoadComponent from "../LoadComponent/LoadComponent";
import { GET_MAQUINAS } from "../../graphql/Maquina/MaquinaQl";
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

  if (loadingTecnicos && loadingMaquinas) {
    // Mostrar el componente de carga aquí
    return <LoadComponent />;
  }

  return (
    <>
      <div className="w-full h-auto flex flex-col justify-center items-center">
        <div className="flex w-full items-center justify-end mt-6">
          <button className="p-2 bg-orange-400 rounded-lg mr-4 shadow-lg duration-300 px-4 hover:shadow-none">
            Cargue Masivo
          </button>
          <button className="p-2 bg-green-400 rounded-lg shadow-lg duration-300 px-4 mr-8 hover:shadow-none">
            Programar Mantenimiento
          </button>
        </div>
        <div className="w-11/12 bg-white rounded-lg shadow-xl mt-12 flex flex-col justify-center p-4">
          <div className="w-full flex items-center">
            <div className="flex flex-col w-1/2 pr-2">
              <Select
                options={listTecnicos}
                placeholder={"Selecciona el tecnico responsable"}
              />
            </div>
            <div className="flex flex-col w-1/2 pl-2">
              <Select
                options={listMaquinas}
                placeholder={
                  "Selecciona la Maquina para programar mantenimiento"
                }
              />
            </div>
          </div>
          <div className="w-full flex items-center justify-center my-8">
            <div className="relative h-10 w-20 mr-2 cursor-pointer">
              <input type="radio" name="" id="" className="radio-button" />

              <label htmlFor="" className="absolute m-5 cursor-pointer pb-2">
                A
              </label>
            </div>
            <div className="relative h-10 w-20 mr-2">
              <input type="radio" name="" id="ta" className="radio-button" />
              <label htmlFor="ta" className="absolute m-5 cursor-pointer mb-2">
                B
              </label>
            </div>
            <div className="relative h-10 w-20">
              <input type="radio" name="" id="" className="radio-button" />
              <label htmlFor="" className="absolute m-5 cursor-pointer mb-2">
                C
              </label>
            </div>
          </div>
          <div className="w-full flex items-center">
            <div className="flex flex-col w-1/2 pr-2">
              <label htmlFor="">Fecha Inicio</label>
              <input
                type="date"
                name=""
                id=""
                className="bg-gray-200 p-2 rounded-md"
              />
            </div>
            <div className="flex flex-col w-1/2 pl-2">
              <label htmlFor="">Fecha Fin</label>
              <input
                type="date"
                name=""
                id=""
                className="bg-gray-200 p-2 rounded-md"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EventForm;
