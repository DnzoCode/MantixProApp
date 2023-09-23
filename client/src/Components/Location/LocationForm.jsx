import React, { useState } from "react";
import LoadComponent from "../LoadComponent/LoadComponent";
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
  const [createLocation, { loading, error }] = useMutation(CREATE_LOCATION);

  const handleChange = ({ target: { name, value } }) => {
    setLocation({
      ...location,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
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
                disabled={!location.locationName || loading}
              >
                Registrar Locacion
              </button>
            </div>
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
          </div>
        </form>
      )}
    </>
  );
}

export default LocationForm;
