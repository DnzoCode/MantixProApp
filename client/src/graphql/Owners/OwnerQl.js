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
