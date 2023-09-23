import { gql } from "@apollo/client";

export const GET_LOCATIONS = gql`
  query {
    locations {
      _id
      location_name
    }
  }
`;

export const CREATE_LOCATION = gql`
  mutation ($locationName: String!) {
    createLocation(location_name: $locationName) {
      _id
      location_name
    }
  }
`;
