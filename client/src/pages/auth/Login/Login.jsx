import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { AUTH_LOGIN } from "../../../graphql/Auth/LoginQl";
import { useNavigate } from "react-router-dom";

function Login() {
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const [authLogin, { loading, error }] = useMutation(AUTH_LOGIN);
  const navigate = useNavigate();
  const handleChange = ({ target: { name, value } }) => {
    setLogin({
      ...login,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await authLogin({
      variables: {
        email: login.email,
        password: login.password,
      },
    });
    console.log(data.login, loading, error);
    if (data) {
      navigate("/users");
    } else if (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="w-screen h-screen bg-dark-purple flex justify-center items-center">
        <div className="bg-white bg-opacity-70 w-3/4 h-5/6 rounded-xl shadow-lg flex justify-center">
          <div className="w-1/2 bg-transparent -gray flex flex-col justify-center items-center">
            <div className="w-full flex justify-center items-center mb-4">
              <h1 className="text-6xl mr-12">Mantix</h1>
              <h2 className="text-md font-light text-dark-purple">Beta</h2>
            </div>
            <div className="w-full flex justify-center items-center">
              <span className="text-dark-purple font-bold">
                Gestion de Mantenimientos
              </span>
            </div>
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col p-4 w-1/2 h-full justify-center shadow-2xl rounded-tl-xl rounded-bl-lg ml-8 bg-white"
          >
            <h1 className="text-2xl font-bold text-center mb-8">
              Iniciar Sesion
            </h1>

            <div className="w-full flex flex-col justify-center">
              <div className="flex flex-col items-center mb-8">
                <label htmlFor="" className="p-4">
                  Correo Electronico
                </label>
                <input
                  type="email"
                  name="email"
                  className="p-2 bg-gray-200 w-4/5 rounded-lg shadow-xl"
                  value={login.email}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col items-center mb-8">
                <label htmlFor="" className="p-4">
                  Contrasena
                </label>
                <input
                  type="password"
                  name="password"
                  className="p-2 bg-gray-200 w-4/5 rounded-lg shadow-xl"
                  value={login.password}
                  onChange={handleChange}
                />
              </div>
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
