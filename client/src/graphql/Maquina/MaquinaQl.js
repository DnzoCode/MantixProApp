import { gql } from "@apollo/client";

export const GET_MAQUINAS = gql`
  query {
    maquinas {
      _id
      maquina_name
      numero_serial
      maquina_modelo
      ultimo_mantenimiento
      maquina_location {
        _id
        location_name
      }
    }
  }
`;
