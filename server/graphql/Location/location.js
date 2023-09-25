import { gql } from "graphql-tag";
import Location from "../../models/LocationModel/Location.js";
import Maquina from "../../models/MaquinaModel/Maquina.js";
import { GraphQLScalarType, Kind } from "graphql";

const resolverMap = {
  Date: new GraphQLScalarType({
    name: "Date",
    description: "Date custom scalar type",
    parseValue(value) {
      return new Date(value); // value from the client
    },
    serialize(value) {
      return value.getTime(); // value sent to the client
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return new Date(+ast.value); // ast value is always in string format
      }
      return null;
    },
  }),
};

export const locationTypeDefs = gql`
  scalar Date

  extend type Query {
    locations: [Location]
    location(_id: ID!): Location
    locationByName(location_name: String!): Location
  }
  extend type Mutation {
    createLocation(location_name: String!): Location
  }
  type Location {
    _id: ID
    location_name: String
    maquina: [Maquina]
    createdAt: Date
    updatedAt: Date
  }
`;

export const locationResolver = {
  Query: {
    locations: async () => await Location.find(),
    location: async (_, { _id }) => await Location.findById(_id),
    locationByName: async (_, { location_name }) => {
      // Convierte location_name a mayúsculas
      const uppercaseLocationName = location_name.toUpperCase();

      const location = await Location.findOne({
        location_name: uppercaseLocationName,
      });

      if (!location) {
        throw new Error("No se encontró la ubicación " + location_name);
      }
      return location;
    },
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
