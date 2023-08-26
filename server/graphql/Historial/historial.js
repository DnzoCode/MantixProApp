import { gql } from "graphql-tag";
import Historial from "../../models/HistorialModel/Historial.js";
import Event from "../../models/EventModel/Event.js";
import User from "../../models/UserModel/User.js";

export const historialTypeDefs = gql`
  extend type Query {
    historials: [Historial]
  }

  type Mutation {
    createHistorial(
      event_id: ID
      user_id: ID
      mantenimiento_status: String
      mantenimiento_date: String
    ): Historial
  }

  type Historial {
    _id: ID
    event_id: Event
    user_id: User
    mantenimiento_status: String
    mantenimiento_date: String
    createdAt: String
    updatedAt: String
  }
`;

export const historialResolver = {
  Query: {
    historials: async () => await Historial.find(),
  },
  Mutation: {
    createHistorial: async (
      _,
      { event_id, user_id, mantenimiento_status, mantenimiento_date }
    ) => {
      const historial = new Historial({
        event_id,
        user_id,
        mantenimiento_status,
        mantenimiento_date,
      });
      const saveHistorial = await historial.save();
      return saveHistorial;
    },
  },
  Historial: {
    event_id: async (parent) => await Event.findById(parent.event_id),
    user_id: async (parent) => await User.findById(parent.user_id),
  },
};
