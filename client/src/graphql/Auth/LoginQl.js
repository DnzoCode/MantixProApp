import { gql } from "@apollo/client";

export const AUTH_LOGIN = gql`
  mutation ($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      _id
      token
      email
      name
      role
    }
  }
`;
