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

export const CREATE_MAQUINA = gql`
  mutation (
    $maquinaName: String
    $maquinaModelo: String
    $numeroSerial: String
    $ultimoMantenimiento: String
    $maquinaLocation: ID
  ) {
    createMaquina(
      maquina_name: $maquinaName
      maquina_modelo: $maquinaModelo
      numero_serial: $numeroSerial
      ultimo_mantenimiento: $ultimoMantenimiento
      maquina_location: $maquinaLocation
    ) {
      _id
      maquina_name
      maquina_modelo
      numero_serial
      ultimo_mantenimiento
      maquina_location {
        _id
        location_name
      }
    }
  }
`;
