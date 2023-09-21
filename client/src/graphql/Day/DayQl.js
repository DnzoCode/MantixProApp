import { gql } from "@apollo/client";

export const REGISTER_DAY = gql`
  mutation ($date: Date, $isClosed: Boolean) {
    createDay(date: $date, isClosed: $isClosed) {
      _id
      date
      isClosed
    }
  }
`;
export const VALIDAR_DIA = gql`
  query ($date: Date!) {
    validarFechaAnterior(date: $date) {
      date
      isClosed
    }
  }
`;
