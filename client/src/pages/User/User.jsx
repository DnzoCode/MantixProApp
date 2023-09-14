import React, { useState } from "react";
import UserCard from "../../Components/User/UserCard";
import { BiPlus, BiSolidGrid, BiListUl } from "react-icons/bi";
import Modal from "../../Components/Global/Modal/Modal";
import UserForm from "../../Components/User/UserForm";
import Layout from "../../Components/Global/Layout";
function User() {
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      <Layout>
        <Modal setOpenModal={setOpenModal} isOpen={openModal}>
          <div>
            <UserForm />
          </div>
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
              Add New
            </button>
          </div>
        </div>
        <div className="grid grid-cols-4 grid-rows-2 gap-4">
          <UserCard />
          <UserCard />
          <UserCard />
          <UserCard />
          <UserCard />
          <UserCard />
        </div>
      </Layout>
    </>
  );
}

export default User;
