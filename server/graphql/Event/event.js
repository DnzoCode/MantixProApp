import { gql } from "graphql-tag";
import Maquina from "../../models/MaquinaModel/Maquina.js";
import Event from "../../models/EventModel/Event.js";
import Tecnico from "../../models/TecnicoModel/Tecnico.js";
import Proveedor from "../../models/ProveedorModel/Proveedor.js";

export const eventTypeDefs = gql`
  extend type Query {
    events: [Event]
    event(_id: ID!): Event
  }
  extend type Mutation {
    createEvent(
      title: String
      start: String
      end: String
      description: String
      maquina: ID
      tecnico_id: ID
      ejecucion: String
      status: String
      proveedor: ID
      turno: String
      mensaje_reprogramado: String
    ): Event
  }
  type Event {
    _id: ID
    title: String
    start: String
    end: String
    description: String
    maquina: Maquina
    tecnico_id: Tecnico
    ejecucion: String
    status: String
    proveedor: Proveedor
    turno: String
    mensaje_reprogramado: String
    createdAt: String
    updatedAt: String
  }
`;

export const eventResolver = {
  Query: {
    events: async () => await Event.find(),
    event: async (_, { _id }) => await Event.findById(_id),
  },
  Mutation: {
    createEvent: async (
      _,
      {
        title,
        start,
        end,
        description,
        maquina,
        tecnico_id,
        ejecucion,
        status,
        proveedor,
        turno,
        mensaje_reprogramado,
      }
    ) => {
      const existMaquina = async () => await Maquina.findById(maquina);
      const existTecnico = async () => await Tecnico.findById(tecnico_id);
      const existProvider = async () => await Proveedor.findById(proveedor);

      if (!existMaquina) throw new Error("Maquina no encontrada");
      if (!existTecnico) throw new Error("Tecnico no encontrado");
      if (!existProvider) throw new Error("Proveedor no encontrado");

      const event = new Event({
        title,
        start,
        end,
        description,
        maquina,
        tecnico_id,
        ejecucion,
        status,
        proveedor,
        turno,
        mensaje_reprogramado,
      });
      const saveEvent = await event.save();
      return saveEvent;
    },
  },
  Event: {
    maquina: async (parent) => await Maquina.findById(parent.maquina),
    tecnico_id: async (parent) => await Tecnico.findById(parent.tecnico_id),
    proveedor: async (parent) => await Proveedor.findById(parent.proveedor),
  },
};
