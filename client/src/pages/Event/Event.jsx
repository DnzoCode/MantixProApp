import { useState } from "react";
import Calendar from "../../Components/Calendar/Calendar";
import Modal from "../../Components/Global/Modal/Modal";
import { BiListUl, BiPlus, BiSolidGrid } from "react-icons/bi";
import { useQuery } from "@apollo/client";
import { GET_EVENTS } from "../../graphql/Event/EventQl";
export default function Event() {
  const [openModal, setOpenModal] = useState(false);
  const { data, loading, error } = useQuery(GET_EVENTS);
  console.log(data);
  return (
    <>
      <Modal setOpenModal={setOpenModal} isOpen={openModal}>
        <div></div>
      </Modal>
      <div className="flex justify-between items-center p-4">
        <div></div>
        <div className="flex items-center">
          <button
            className="bg-blue-600 text-white p-2 rounded-lg flex items-center hover:bg-blue-800 duration-100"
            onClick={() => setOpenModal(true)}
          >
            <BiPlus className="text-xl" />
            Add New
          </button>
        </div>
      </div>
      <div className="flex gap-4 ">
        <div className="bg-white p-4 rounded-lg shadow-xl col-span-4 lg:col-span-3 w-full flex justify-strech items-stretch">
          <Calendar />
        </div>
      </div>
    </>
  );
}
