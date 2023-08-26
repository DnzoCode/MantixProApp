import { gql } from "graphql-tag";
import Location from "../../models/LocationModel/Location.js";
import Maquina from "../../models/MaquinaModel/Maquina.js";

export const locationTypeDefs = gql`
  extend type Query {
    locations: [Location]
    location(_id: ID!): Location
  }
  extend type Mutation {
    createLocation(location_name: String!): Location
  }
  type Location {
    _id: ID
    location_name: String
    maquina: [Maquina]
    createdAt: String
    updatedAt: String
  }
`;

export const locationResolver = {
  Query: {
    locations: async () => await Location.find(),
    location: async (_, { _id }) => await Location.findById(_id),
  },
  Mutation: {
    createLocation: async (_, { location_name }) => {
      const location = new Location({
        location_name,
      });
      const saveLocation = await location.save();
      return saveLocation;
    },
  },
  Location: {
    maquina: async (parent) =>
      await Maquina.find({ maquina_location: parent._id }),
  },
};
