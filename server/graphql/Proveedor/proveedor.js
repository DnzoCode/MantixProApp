import { gql } from "graphql-tag";
import Proveedor from "../../models/ProveedorModel/Proveedor.js";
import { GraphQLScalarType, Kind } from "graphql";

const resolverMap = new GraphQLScalarType({
  name: "Date",
  description: "Fecha en formato ISO8601",
  parseValue(value) {
    // Convierte el valor de entrada (string) en un objeto Date
    return new Date(value);
  },
  serialize(value) {
    // Convierte un objeto Date en una cadena de texto ISO8601
    return value.toISOString();
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      // Convierte una cadena de texto en un objeto Date
      return new Date(ast.value);
    }
    return null;
  },
});
export const proveedorTypeDefs = gql`
  scalar Date

  extend type Query {
    proveedores: [Proveedor]
    proveedor(_id: ID): Proveedor
  }

  type Mutation {
    createProveedor(
      name_proveedor: String
      contacto: String
      telefono: Int
    ): Proveedor
  }

  type Proveedor {
    _id: ID
    name_proveedor: String
    contacto: String
    telefono: Int
    createdAt: Date
    updatedAt: Date
  }
`;

export const proveedorResolver = {
  Query: {
    proveedores: async () => await Proveedor.find(),
    proveedor: async (_, { _id }) => await Proveedor.findById(_id),
  },
  Mutation: {
    createProveedor: async (_, { name_proveedor, contacto, telefono }) => {
      const proveedor = new Proveedor({
        name_proveedor,
        contacto,
        telefono,
      });
      const saveProveedor = await proveedor.save();
      return saveProveedor;
    },
  },
};
