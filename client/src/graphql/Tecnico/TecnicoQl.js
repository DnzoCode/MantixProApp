import { gql } from "@apollo/client";

export const GET_TECNICOS = gql`
  query {
    tecnicos {
      _id
      tecnico_name
      tecnico_apellido
    }
  }
`;
