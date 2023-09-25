import React, { useState } from "react";
import LoadComponent from "../LoadComponent/LoadComponent";
import { parse } from "papaparse";
import {
  CREATE_LOCATION,
  GET_LOCATIONS,
} from "../../graphql/Location/LocationQl";
import { useMutation } from "@apollo/client";
import { toast } from "sonner";

function LocationForm() {
  const [location, setLocation] = useState({
    locationName: "",
  });

  const [modeForm, setModeForm] = useState("Register");

  const [carga, setCarga] = useState(null);
  const [file, setFile] = useState(null);

  const [createLocation, { loading, error }] = useMutation(CREATE_LOCATION);

  const handleChange = ({ target: { name, value } }) => {
    setLocation({
      ...location,
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
          locationName: row.Locacion,
        });
      }
      return result;
    }, []);
  };
  const handleSubmit = async (e, mode) => {
    e.preventDefault();
    if (mode == "Register") {
      await createLocation({
        variables: {
          locationName: location.locationName,
        },
        refetchQueries: [
          {
            query: GET_LOCATIONS,
          },
        ],
      });
      toast.success("Location has been created");
      setLocation({
        locationName: "",
      });
    } else {
      const csvData = await readFile(file);
      const locaciones = parseCsv(csvData);
      await locaciones.map((locate) => {
        createLocation({
          variables: {
            locationName: locate.locationName.toUpperCase(),
          },
          refetchQueries: [
            {
              query: GET_LOCATIONS,
            },
          ],
        });
      });
      toast.success("Locations has been created");
      setLocation({
        locationName: "",
      });
      setFile(null);
    }
  };
  return (
    <>
      {loading ? (
        <LoadComponent />
      ) : (
        <form onSubmit={(e) => handleSubmit(e, modeForm)}>
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
                    ? !location.locationName || loading
                    : loading || !file
                }
              >
                Registrar Locacion
              </button>
            </div>
            {modeForm == "Register" ? (
              <div className="w-11/12 bg-white rounded-lg shadow-xl mt-12 flex flex-col justify-center p-4">
                <div className="w-full flex items-center mt-8">
                  <div className="flex flex-col w-full pl-2">
                    <label htmlFor="" className="pl-2 pb-2 font-bold">
                      Nombre Locacion
                    </label>
                    <input
                      type="text"
                      name="locationName"
                      id="locationName"
                      value={location.locationName}
                      className="bg-gray-200 p-2 rounded-md"
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-11/12 bg-white rounded-lg shadow-xl mt-12 flex flex-col justify-center p-4">
                <div className="w-full flex items-center mt-8">
                  <div className="flex flex-col w-full pl-2">
                    <label htmlFor="" className="pl-2 pb-2 font-bold">
                      Cargar Documento
                    </label>
                    <input
                      type="file"
                      className="bg-gray-200 p-2 rounded-md"
                      onChange={handleFileChange}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </form>
      )}
    </>
  );
}

export default LocationForm;
