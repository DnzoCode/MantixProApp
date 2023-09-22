import React, { useState } from "react";
import Layout from "../../Components/Global/Layout";
import { BiListUl, BiPlus, BiSolidGrid } from "react-icons/bi";
import { useQuery } from "@apollo/client";
import { GET_TECNICOS } from "../../graphql/Tecnico/TecnicoQl";
import TecnicoCard from "../../Components/Tecnico/TecnicoCard";
import Modal from "../../Components/Global/Modal/Modal";
import TecnicoForm from "../../Components/Tecnico/TecnicoForm";
function Tecnico() {
  const [openModal, setOpenModal] = useState(false);
  const { data, loading, error } = useQuery(GET_TECNICOS);
  return (
    <>
      <Layout>
        <Modal
          setOpenModal={setOpenModal}
          isOpen={openModal}
          title={"Registrar Tecnico"}
        >
          <TecnicoForm />
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
              Agregar Tecnico
            </button>
          </div>
        </div>
        <div className="grid grid-cols-4 grid-rows-2 gap-4">
          {data?.tecnicos?.map((tecnico, index) => (
            <TecnicoCard key={index} tecnico={tecnico} />
          ))}
        </div>
      </Layout>
    </>
  );
}

export default Tecnico;
