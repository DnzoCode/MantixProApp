import { gql } from "graphql-tag";
import { GraphQLScalarType, Kind } from "graphql";
import Maquina from "../../models/MaquinaModel/Maquina.js";
import Event from "../../models/EventModel/Event.js";
import Tecnico from "../../models/TecnicoModel/Tecnico.js";
import Proveedor from "../../models/ProveedorModel/Proveedor.js";

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

export const eventTypeDefs = gql`
  scalar Date
  extend type Query {
    events: [Event]
    event(_id: ID!): Event
    eventPorFecha(start: String!): [Event]
  }
  extend type Mutation {
    createEvent(
      title: String
      start: Date
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
    reprogramarEvent(
      _id: ID!
      start: Date
      end: String
      status: String
      mensaje_reprogramado: String
    ): Event
    ejecutarEvent(_id: ID!, status: String, tecnico_id: ID): Event
    completarEvent(_id: ID!, status: String): Event
    updateEvent(
      _id: ID!
      title: String
      start: Date
      end: Date
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
    start: Date
    end: Date
    description: String
    maquina: Maquina
    tecnico_id: Tecnico
    ejecucion: String
    status: String
    proveedor: Proveedor
    turno: String
    mensaje_reprogramado: String
    createdAt: Date
    updatedAt: Date
  }
`;

export const eventResolver = {
  Query: {
    events: async () => await Event.find(),
    event: async (_, { _id }) => await Event.findById(_id),
    eventPorFecha: async (_, { start }) => {
      const startDate = new Date(start);
      const event = await Event.find({ start: startDate });
      return event;
    },
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
    reprogramarEvent: async (
      _,
      { _id, start, end, status, mensaje_reprogramado }
    ) => {
      const reprogramar = await Event.findByIdAndUpdate(_id, {
        start,
        end,
        status,
        mensaje_reprogramado,
      });

      if (!reprogramar) throw new Error("Mantenimiento no encontrado");

      return reprogramar;
    },
    ejecutarEvent: async (_, { _id, status, tecnico_id }) => {
      const ejecutar = await Event.findByIdAndUpdate(_id, {
        status,
        tecnico_id,
      });
      if (!ejecutar) throw new Error("Mantenimiento no encontrado");
      return ejecutar;
    },
    completarEvent: async (_, { _id, status }) => {
      const ejecutar = await Event.findByIdAndUpdate(_id, {
        status,
      });
      if (!ejecutar) throw new Error("Mantenimiento no encontrado");
      return ejecutar;
    },
    updateEvent: async (
      _,
      {
        _id,
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
    ) => {},
  },
  Event: {
    maquina: async (parent) => await Maquina.findById(parent.maquina),
    tecnico_id: async (parent) => await Tecnico.findById(parent.tecnico_id),
    proveedor: async (parent) => await Proveedor.findById(parent.proveedor),
  },
};
