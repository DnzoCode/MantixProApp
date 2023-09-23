import React, { useState } from "react";
import LoadComponent from "../LoadComponent/LoadComponent";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_OWNER, GET_OWNERS } from "../../graphql/Owners/OwnerQl";
import { toast } from "sonner";
import Select from "react-select";
import { GET_LOCATIONS } from "../../graphql/Location/LocationQl";

function OwnerForm() {
  const { data, loading, error } = useQuery(GET_LOCATIONS);
  const [selectedOptionLocation, setSelectedOptionLocation] = useState(null);
  const listLocations = data?.locations.map((location) => {
    return {
      value: location._id,
      label: `${location.location_name}`,
    };
  });
  const [owner, setOwner] = useState({
    encargadoName: "",
    encargadoApellido: "",
    encargadoLocation: "",
  });
  const handleSelectChange = (selected) => {
    setSelectedOptionLocation(selected);
    setOwner({ ...owner, encargadoLocation: selected.value });
  };
  const [createOwner, { loading: loadingOwner, error: errorOwner }] =
    useMutation(CREATE_OWNER);

  const handleChange = ({ target: { name, value } }) => {
    setOwner({
      ...owner,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await createOwner({
      variables: {
        encargadoName: owner.encargadoName,
        encargadoApellido: owner.encargadoApellido,
        encargadoLocation: owner.encargadoLocation,
      },
      refetchQueries: [
        {
          query: GET_OWNERS,
        },
      ],
    });
    toast.success("Encargado has been created");
    setOwner({
      encargadoName: "",
      encargadoApellido: "",
      encargadoLocation: "",
    });
  };
  return (
    <>
      {loadingOwner ? (
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
                disabled={!owner.encargadoName || loading}
              >
                Registrar Encargado
              </button>
            </div>
            <div className="w-11/12 bg-white rounded-lg shadow-xl mt-12 flex flex-col justify-center p-4">
              <div className="w-full flex items-center justify-center">
                <label htmlFor="" className="pl-2 pb-2 font-bold mr-12">
                  Area ubicacion
                </label>
                <Select
                  options={listLocations}
                  placeholder={"Selecciona el area de ubicacion"}
                  name="encargadoLocation"
                  value={selectedOptionLocation}
                  onChange={(selected) => handleSelectChange(selected)}
                />
              </div>
              <div className="w-full flex items-center mt-8">
                <div className="flex flex-col w-1/2 pl-2">
                  <label htmlFor="" className="pl-2 pb-2 font-bold">
                    Nombre del Encargado
                  </label>
                  <input
                    type="text"
                    name="encargadoName"
                    id="encargadoName"
                    value={owner.encargadoName}
                    className="bg-gray-200 p-2 rounded-md"
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col w-1/2 pl-2">
                  <label htmlFor="" className="pl-2 pb-2 font-bold">
                    Apellido del Encargado
                  </label>
                  <input
                    type="text"
                    name="encargadoApellido"
                    id="encargadoApellido"
                    value={owner.encargadoApellido}
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

export default OwnerForm;
