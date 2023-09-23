import React, { useState } from "react";
import Location from "../Location/Location";
import Layout from "../../Components/Global/Layout";
import Modal from "../../Components/Global/Modal/Modal";
import { BiListUl, BiPlus, BiSolidGrid } from "react-icons/bi";
import { useQuery } from "@apollo/client";
import { GET_OWNERS } from "../../graphql/Owners/OwnerQl";
import OwnerForm from "../../Components/Owner/OwnerForm";
import OwnerCard from "../../Components/Owner/OwnerCard";

function Owner() {
  const [openModal, setOpenModal] = useState(false);
  const { data, loading, error } = useQuery(GET_OWNERS);
  return (
    <>
      <Layout loading={loading}>
        <Modal
          setOpenModal={setOpenModal}
          isOpen={openModal}
          title={"Registrar Encargado"}
        >
          <OwnerForm />
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
          {data?.owners?.map((owner, index) => (
            <OwnerCard key={index} owner={owner} />
          ))}
        </div>
      </Layout>
    </>
  );
}

export default Owner;
