import React, { useState } from "react";
import {
  GET_LOCATIONS,
  GET_LOCATION_BY_NAME,
} from "../../graphql/Location/LocationQl";
import { useApolloClient, useMutation, useQuery } from "@apollo/client";
import Select from "react-select";
import { CREATE_MAQUINA, GET_MAQUINAS } from "../../graphql/Maquina/MaquinaQl";
import LoadComponent from "../LoadComponent/LoadComponent";
import { toast } from "sonner";
import { parse } from "papaparse";

function MaquinaForm() {
  const client = useApolloClient();
  const { data, loading, error } = useQuery(GET_LOCATIONS);
  const [modeForm, setModeForm] = useState("Register");

  const [carga, setCarga] = useState(null);
  const [file, setFile] = useState(null);
  const [selectedOptionLocation, setSelectedOptionLocation] = useState(null);
  const listLocations = data?.locations.map((location) => {
    return {
      value: location?._id,
      label: `${location?.location_name}`,
    };
  });

  const [maquina, setMaquina] = useState({
    maquinaName: "",
    maquinaModelo: "",
    numeroSerial: "",
    ultimoMantenimiento: "",
    maquinaLocation: "",
  });

  const handleSelectChange = (selected) => {
    setSelectedOptionLocation(selected);
    setMaquina({ ...maquina, maquinaLocation: selected.value });
  };

  const handleChange = ({ target: { name, value } }) => {
    setMaquina({
      ...maquina,
      [name]: value,
    });
  };

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
          name: row === null ? "N/A" : row.Nombre_Maquina,
          modelo: row === null ? "N/A" : row.Modelo_Maquina,
          numero_serial: row === null ? "N/A" : row.Numero_Serial,
          location: row === null ? "N/A" : row.Locacion,
        });
      }
      return result;
    }, []);
  };
  const [createMaquina, { loading: loadingMaquinas, error: errorMaquinas }] =
    useMutation(CREATE_MAQUINA);

  const handleSubmit = async (e, mode) => {
    e.preventDefault();
    if (mode == "Register") {
      await createMaquina({
        variables: {
          maquinaName: maquina.maquinaName,
          maquinaModelo: maquina.maquinaModelo,
          numeroSerial: maquina.numeroSerial,
          ultimoMantenimiento: null,
          maquinaLocation: maquina.maquinaLocation,
        },
        refetchQueries: [
          {
            query: GET_MAQUINAS,
          },
        ],
      });
      toast.success("Maquina has been created");
      setMaquina({
        maquinaName: "",
        maquinaModelo: "",
        numeroSerial: "",
        ultimoMantenimiento: null,
        maquinaLocation: "",
      });
    } else {
      const csvData = await readFile(file);
      const maquinas = parseCsv(csvData);
      await maquinas.map((maq) => {
        const location = data.locations.find(
          (loc) =>
            loc.location_name.toUpperCase() === maq.location.toUpperCase()
        );
        createMaquina({
          variables: {
            maquinaName: maq.name,
            maquinaModelo: maq.modelo,
            numeroSerial: maq.numero_serial,
            ultimoMantenimiento: null,
            maquinaLocation: location._id,
          },
          refetchQueries: [
            {
              query: GET_MAQUINAS,
            },
          ],
        });
      });
      toast.success("Maquinas has been created");
      setFile(null);
    }
  };
  return (
    <>
      {loadingMaquinas ? (
        <LoadComponent />
      ) : (
        <>
          <form onSubmit={(e) => handleSubmit(e, modeForm)}>
            <div className="w-full h-auto flex flex-col justify-center items-center">
              <p>{error && error.message}</p>
              <p>{errorMaquinas && errorMaquinas.message}</p>
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
                      ? !maquina.maquinaName ||
                        !maquina.maquinaModelo ||
                        !maquina.numeroSerial ||
                        loading
                      : loading || file == null
                  }
                >
                  Registrar Maquina
                </button>
              </div>
              <div className="w-11/12 bg-white rounded-lg shadow-xl mt-12 flex flex-col justify-center p-4">
                {modeForm == "Register" ? (
                  <>
                    <div className="w-full flex items-center justify-center">
                      <label htmlFor="" className="pl-2 pb-2 font-bold mr-12">
                        Area ubicacion
                      </label>
                      <Select
                        options={listLocations}
                        placeholder={"Selecciona el area de ubicacion"}
                        name="maquina_location"
                        value={selectedOptionLocation}
                        onChange={(selected) => handleSelectChange(selected)}
                      />
                    </div>
                    <div className="w-full flex items-center mt-8">
                      <div className="flex flex-col w-1/2 pr-2">
                        <label htmlFor="" className="pl-2 pb-2 font-bold">
                          Nombre de la Maquina
                        </label>
                        <input
                          type="text"
                          name="maquinaName"
                          id="maquinaName"
                          value={maquina.maquinaName}
                          className="bg-gray-200 p-2 rounded-md"
                          onChange={handleChange}
                        />
                      </div>
                      <div className="flex flex-col w-1/2 pl-2">
                        <label htmlFor="" className="pl-2 pb-2 font-bold">
                          Modelo de la maquina
                        </label>
                        <input
                          type="text"
                          name="maquinaModelo"
                          id="maquinaModelo"
                          value={maquina.maquinaModelo}
                          className="bg-gray-200 p-2 rounded-md"
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="w-full flex items-center mt-8">
                      <div className="flex flex-col w-full pr-2">
                        <label htmlFor="" className="pl-2 pb-2 font-bold">
                          Numero Serial
                        </label>
                        <input
                          type="text"
                          name="numeroSerial"
                          id="numeroSerial"
                          value={maquina.numeroSerial}
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
      )}
    </>
  );
}

export default MaquinaForm;
