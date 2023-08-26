import { gql } from "graphql-tag";
import WorkOrder from "../../models/WorkOrderModel/WorkOrder.js";
import Event from "../../models/EventModel/Event.js";
import OwnerProcess from "../../models/OwnerProcessModel/OwnerProcess.js";
import Tecnico from "../../models/TecnicoModel/Tecnico.js";

export const workOrderTypeDefs = gql`
  extend type Query {
    workOrders: [WorkOrder]
  }

  type Mutation {
    createWorkOrder(
      work_order: String
      event_id: ID
      owner: ID
      tecnico_id: ID
      trabajo_realizado: String
      diagnostico: String
      actividades: String
      hora_inicio: String
      hora_fin: String
      causas: String
      observacion: String
    ): WorkOrder
  }

  type WorkOrder {
    _id: ID
    work_order: String
    event_id: Event
    owner: OwnerProcess
    tecnico_id: Tecnico
    trabajo_realizado: String
    diagnostico: String
    actividades: String
    hora_inicio: String
    hora_fin: String
    causas: String
    observacion: String
    createdAt: String
    updatedAt: String
  }
`;

export const workOrderResolver = {
  Query: {
    workOrders: async () => await WorkOrder.find(),
  },
  Mutation: {
    createWorkOrder: async (
      _,
      {
        work_order,
        event_id,
        owner,
        tecnico_id,
        trabajo_realizado,
        diagnostico,
        actividades,
        hora_inicio,
        hora_fin,
        causas,
        observacion,
      }
    ) => {
      const workOrder = new WorkOrder({
        work_order,
        event_id,
        owner,
        tecnico_id,
        trabajo_realizado,
        diagnostico,
        actividades,
        hora_inicio,
        hora_fin,
        causas,
        observacion,
      });
      const saveWorkOrder = await workOrder.save();
      return saveWorkOrder;
    },
  },
  WorkOrder: {
    event_id: async (parent) => await Event.findById(parent.event_id),
    owner: async (parent) => await OwnerProcess.findById(parent.owner),
    tecnico_id: async (parent) => await Tecnico.findById(parent.tecnico_id),
  },
};
