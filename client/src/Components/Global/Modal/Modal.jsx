import { BiX } from "react-icons/bi";

function Modal({ children, setOpenModal, isOpen }) {
  return (
    <>
      <div
        className={` top-0 right-0 left-0 h-screen  bg-dark-purple bg-opacity-70 flex justify-center items-center  ${
          isOpen ? "fixed" : "hidden "
        }`}
      >
        <div className={`bg-white w-2/4 rounded-xl shadow-lg h-3/4 p-4`}>
          <div className="flex w-full justify-between items-center">
            <span className="font-bold">Add New</span>
            <BiX
              className="text-3xl cursor-pointer"
              onClick={() => setOpenModal(false)}
            />
          </div>
          {children}
        </div>
      </div>
    </>
  );
}

export default Modal;
