import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import LoadComponent from "../LoadComponent/LoadComponent";
import { toast } from "sonner";
import { CREATE_TECNICO, GET_TECNICOS } from "../../graphql/Tecnico/TecnicoQl";
import { BiCog } from "react-icons/bi";

function TecnicoForm() {
  const [tecnico, setTecnico] = useState({
    tecnicoName: "",
    tecnicoApellido: "",
  });

  const [createTecnico, { loading, error }] = useMutation(CREATE_TECNICO);

  const handleChange = ({ target: { name, value } }) => {
    setTecnico({
      ...tecnico,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await createTecnico({
      variables: {
        tecnicoName: tecnico.tecnicoName,
        tecnicoApellido: tecnico.tecnicoApellido,
      },
      refetchQueries: [
        {
          query: GET_TECNICOS,
        },
      ],
    });
    toast.success("Tecnico has been created");
    setTecnico({
      tecnicoName: "",
      tecnicoApellido: "",
    });
  };
  return (
    <>
      {loading ? (
        <LoadComponent />
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="w-full h-auto flex flex-col justify-center items-center">
            <div className="flex w-full items-center justify-end mt-6">
              <button className="p-2 bg-orange-400 rounded-lg mr-4 shadow-lg duration-300 px-4 hover:shadow-none">
                Cargue Masivo
              </button>
              <button
                className="p-2 bg-green-400 rounded-lg shadow-lg duration-300 px-4 mr-8 hover:shadow-none hover:bg-green-600 disabled:bg-green-200 disabled:shadow-none"
                disabled={
                  !tecnico.tecnicoName || !tecnico.tecnicoApellido || loading
                }
              >
                Registrar Tecnico
              </button>
            </div>
            <div className="w-11/12 bg-white rounded-lg shadow-xl mt-12 flex flex-col justify-center p-4">
              <div className="w-full flex items-center mt-8">
                <div className="flex flex-col w-1/2 pr-2">
                  <label htmlFor="" className="pl-2 pb-2 font-bold">
                    Nombre del tecnico
                  </label>
                  <input
                    type="text"
                    name="tecnicoName"
                    id="tecnicoName"
                    value={tecnico.tecnicoName}
                    className="bg-gray-200 p-2 rounded-md"
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col w-1/2 pl-2">
                  <label htmlFor="" className="pl-2 pb-2 font-bold">
                    Apellido del tecncio
                  </label>
                  <input
                    type="text"
                    name="tecnicoApellido"
                    id="tecnicoApellido"
                    value={tecnico.tecnicoApellido}
                    className="bg-gray-200 p-2 rounded-md"
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
      )}
    </>
  );
}

export default TecnicoForm;
