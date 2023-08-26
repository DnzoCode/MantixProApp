import { gql } from "graphql-tag";
import OwnerProcess from "../../models/OwnerProcessModel/OwnerProcess.js";
import Location from "../../models/LocationModel/Location.js";

export const ownerTypeDefs = gql`
  extend type Query {
    owners: [OwnerProcess]
    owner(_id: ID!): OwnerProcess
  }

  type Mutation {
    createOwner(
      encargado_name: String
      encargado_apellido: String
      encargado_location: ID
    ): OwnerProcess
  }

  type OwnerProcess {
    _id: ID
    encargado_name: String
    encargado_apellido: String
    encargado_location: Location
    createdAt: String
    updatedAt: String
  }
`;

export const ownerResolver = {
  Query: {
    owners: async () => await OwnerProcess.find(),
    owner: async (_, { _id }) => await OwnerProcess.findById(_id),
  },
  Mutation: {
    createOwner: async (
      _,
      { encargado_name, encargado_apellido, encargado_location }
    ) => {
      const owner = new OwnerProcess({
        encargado_name,
        encargado_apellido,
        encargado_location,
      });
      const saveOwner = await owner.save();
      return saveOwner;
    },
  },
  OwnerProcess: {
    encargado_location: async (parent) =>
      await Location.findById(parent.encargado_location),
  },
};
