import React, { useState } from "react";
import Layout from "../../Components/Global/Layout";
import Modal from "../../Components/Global/Modal/Modal";
import { BiListUl, BiPlus, BiSolidGrid } from "react-icons/bi";
import MaquinaCard from "../../Components/Maquina/MaquinaCard";
import { GET_MAQUINAS } from "../../graphql/Maquina/MaquinaQl";
import { useQuery } from "@apollo/client";
import MaquinaForm from "../../Components/Maquina/MaquinaForm";
function Maquina() {
  const [openModal, setOpenModal] = useState(false);
  const { data, loading, error } = useQuery(GET_MAQUINAS);
  console.log(data);
  return (
    <>
      <Layout loading={loading}>
        <Modal
          setOpenModal={setOpenModal}
          isOpen={openModal}
          title={"Registrar Maquina"}
        >
          <MaquinaForm />
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
              Agregar Maquina
            </button>
          </div>
        </div>
        <div className="grid grid-cols-4 grid-rows-2 gap-4">
          {data?.maquinas?.map((maquina, index) => (
            <MaquinaCard key={index} maquina={maquina} />
          ))}
        </div>
      </Layout>
    </>
  );
}

export default Maquina;
