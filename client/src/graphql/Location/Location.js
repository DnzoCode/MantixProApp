import { gql } from "@apollo/client";

export const GET_LOCATIONS = gql`
  query {
    locations {
      _id
      location_name
    }
  }
`;
