import { gql } from "graphql-tag";
import Maquina from "../../models/MaquinaModel/Maquina.js";
import Location from "../../models/LocationModel/Location.js";
import { GraphQLScalarType, Kind } from "graphql";
// Define un tipo para representar fechas
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

export const maquinaTypeDefs = gql`
  scalar Date
  extend type Query {
    maquinas: [Maquina]
    maquina(_id: ID!): Maquina
  }
  extend type Mutation {
    createMaquina(
      maquina_name: String
      maquina_modelo: String
      numero_serial: String
      maquina_location: ID
      ultimo_mantenimiento: String
    ): Maquina
  }

  type Maquina {
    _id: ID
    maquina_name: String
    maquina_modelo: String
    numero_serial: String
    ultimo_mantenimiento: String
    maquina_location: Location
    createdAt: Date
    updatedAt: Date
  }
`;

export const maquinaResolver = {
  Query: {
    maquinas: async () => await Maquina.find(),
    maquina: async (_, { _id }) => await Maquina.findById(_id),
  },
  Mutation: {
    createMaquina: async (
      _,
      {
        maquina_name,
        maquina_modelo,
        numero_serial,
        maquina_location,
        ultimo_mantenimiento,
      }
    ) => {
      const existLocation = await Location.findById(maquina_location);
      if (!existLocation) throw new Error("La locacion no existe");

      const maquina = new Maquina({
        maquina_name,
        maquina_modelo,
        numero_serial,
        maquina_location,
        ultimo_mantenimiento,
      });
      const saveMaquina = await maquina.save();
      return saveMaquina;
    },
  },
  Maquina: {
    maquina_location: async (parent) =>
      await Location.findById(parent.maquina_location),
  },
};
