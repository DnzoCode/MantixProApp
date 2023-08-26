import { gql } from "graphql-tag";
import Tecnico from "../../models/TecnicoModel/Tecnico.js";

export const tecnicoTypeDefs = gql`
  extend type Query {
    tecnicos: [Tecnico]
    tecnico(_id: ID!): Tecnico
  }

  extend type Mutation {
    createTecnico(tecnico_name: String, tecnico_apellido: String): Tecnico
  }
  type Tecnico {
    _id: ID
    tecnico_name: String
    tecnico_apellido: String
    createdAt: String
    updatedAt: String
  }
`;

export const tecnicoResolver = {
  Query: {
    tecnicos: async () => await Tecnico.find(),
    tecnico: async (_, { _id }) => await Tecnico.findById(_id),
  },
  Mutation: {
    createTecnico: async (_, { tecnico_name, tecnico_apellido }) => {
      const tecnico = new Tecnico({
        tecnico_name,
        tecnico_apellido,
      });
      const saveTecnico = await tecnico.save();
      return saveTecnico;
    },
  },
};
