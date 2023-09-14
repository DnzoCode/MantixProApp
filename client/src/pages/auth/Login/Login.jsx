import React from "react";

function Login() {
  return (
    <>
      <div className="w-screen h-screen bg-dark-purple flex justify-center items-center">
        <div className="bg-white w-3/4 h-5/6 rounded-xl shadow-lg flex justify-center">
          <div className="w-1/2 bg-primary-gray"></div>
          <form
            action=""
            className="flex flex-col p-4 w-1/2 h-full justify-center shadow-2xl rounded-tl-xl rounded-bl-lg ml-8"
          >
            <h1 className="text-2xl font-bold text-center mb-8">
              Iniciar Sesion
            </h1>

            <div className="flex flex-col items-start mb-8">
              <label htmlFor="" className="p-4">
                Correo Electronico
              </label>
              <input
                type="text"
                className="p-2 bg-gray-200 w-3/6 rounded-lg shadow-xl"
              />
            </div>
            <div className="flex flex-col items-start mb-8">
              <label htmlFor="" className="p-4">
                Contrasena
              </label>
              <input
                type="password"
                className="p-2 bg-gray-200 w-3/6 rounded-lg shadow-xl"
              />
            </div>
            <button className="p-4 shadow-xl border rounded-xl hover:bg-dark-purple duration-200 hover:text-white">
              Entrar
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
