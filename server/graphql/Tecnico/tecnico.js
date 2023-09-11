import { gql } from "graphql-tag";
import Tecnico from "../../models/TecnicoModel/Tecnico.js";
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
export const tecnicoTypeDefs = gql`
  scalar Date
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
    createdAt: Date
    updatedAt: Date
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
