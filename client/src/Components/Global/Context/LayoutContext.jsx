import React, { createContext, useContext, useState } from "react";

const LayoutContext = createContext();

export const LayoutProvider = ({ children }) => {
  const [isLoadPageActive, setIsLoadPageActive] = useState(false);
  const [loading, setLoading] = useState(false); // Estado para controlar la carga

  // Función para activar LoadPage
  const activateLoadPage = () => {
    setIsLoadPageActive(true);
  };

  // Función para desactivar LoadPage
  const deactivateLoadPage = () => {
    setIsLoadPageActive(false);
  };

  return (
    <LayoutContext.Provider
      value={{
        isLoadPageActive,
        activateLoadPage,
        deactivateLoadPage,
        loading,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
};

export const useLayoutContext = () => {
  return useContext(LayoutContext);
};
