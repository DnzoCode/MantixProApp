import { gql } from "@apollo/client";

export const GET_OWNERS = gql`
  query {
    owners {
      _id
      encargado_name
      encargado_apellido
      encargado_location {
        _id
        location_name
      }
    }
  }
`;

export const CREATE_OWNER = gql`
  mutation (
    $encargadoName: String
    $encargadoApellido: String
    $encargadoLocation: ID
  ) {
    createOwner(
      encargado_name: $encargadoName
      encargado_apellido: $encargadoApellido
      encargado_location: $encargadoLocation
    ) {
      _id
      encargado_name
      encargado_apellido
      encargado_location {
        _id
        location_name
      }
    }
  }
`;
