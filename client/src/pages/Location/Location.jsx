import { useState } from "react";
import Layout from "../../Components/Global/Layout";
import { BiListUl, BiPlus, BiSolidGrid } from "react-icons/bi";
import { GET_LOCATIONS } from "../../graphql/Location/LocationQl";
import { useQuery } from "@apollo/client";
import LocationCard from "../../Components/Location/LocationCard";
import Modal from "../../Components/Global/Modal/Modal";
import LocationForm from "../../Components/Location/LocationForm";

function Location() {
  const [openModal, setOpenModal] = useState(false);
  const { data, loading, error } = useQuery(GET_LOCATIONS);
  return (
    <>
      <Layout loading={loading}>
        <Modal
          setOpenModal={setOpenModal}
          isOpen={openModal}
          title={"Registrar Locacion"}
        >
          <LocationForm />
        </Modal>
        <div className="flex justify-between items-center p-4">
          <div></div>
          <div className="flex items-center">
            <button className="mr-4 p-2 rounded-lg flex items-center">
              <BiListUl />
            </button>
            <button className="mr-4 bg-blue-600 text-white p-2 rounded-lg flex items-center ">
              <BiSolidGrid />
            </button>
            <button
              className="bg-blue-600 text-white p-2 rounded-lg flex items-center hover:bg-blue-800 duration-100"
              onClick={() => setOpenModal(true)}
            >
              <BiPlus className="text-xl" />
              Agregar Locacion
            </button>
          </div>
        </div>
        <div className="grid grid-cols-4 grid-rows-2 gap-4">
          {data?.locations?.map((location, index) => (
            <LocationCard key={index} location={location} />
          ))}
        </div>
      </Layout>
    </>
  );
}

export default Location;
