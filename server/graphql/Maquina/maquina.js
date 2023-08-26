import { gql } from "graphql-tag";
import Maquina from "../../models/MaquinaModel/Maquina.js";
import Location from "../../models/LocationModel/Location.js";

export const maquinaTypeDefs = gql`
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
    createdAt: String
    updatedAt: String
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
