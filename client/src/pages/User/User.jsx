import React from "react";
import UserCard from "../../Components/User/UserCard";
import { BiPlus, BiSolidGrid, BiListUl } from "react-icons/bi";
function User() {
  return (
    <>
      <div className="flex justify-between items-center p-4">
        <div></div>
        <div className="flex items-center">
          <button className="mr-4 p-2 rounded-lg flex items-center">
            <BiListUl />
          </button>
          <button className="mr-4 bg-blue-600 text-white p-2 rounded-lg flex items-center ">
            <BiSolidGrid />
          </button>
          <button className="bg-blue-600 text-white p-2 rounded-lg flex items-center">
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
    </>
  );
}

export default User;
