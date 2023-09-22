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
export const CREATE_TECNICO = gql`
  mutation ($tecnicoName: String, $tecnicoApellido: String) {
    createTecnico(
      tecnico_name: $tecnicoName
      tecnico_apellido: $tecnicoApellido
    ) {
      _id
      tecnico_apellido
      tecnico_name
    }
  }
`;
