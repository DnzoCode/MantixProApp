import { gql } from "graphql-tag";
import Proveedor from "../../models/ProveedorModel/Proveedor.js";

export const proveedorTypeDefs = gql`
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
    createdAt: String
    updatedAt: String
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
