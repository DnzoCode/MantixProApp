import { gql } from "graphql-tag";
import { userTypeDefs, userResolver } from "./User/user.js";
import { tecnicoTypeDefs, tecnicoResolver } from "./Tecnico/tecnico.js";
import { eventTypeDefs, eventResolver } from "./Event/event.js";
import { proveedorTypeDefs, proveedorResolver } from "./Proveedor/proveedor.js";
import { ownerTypeDefs, ownerResolver } from "./OwnerProcess/ownerProcess.js";
import { maquinaTypeDefs, maquinaResolver } from "./Maquina/maquina.js";
import { locationTypeDefs, locationResolver } from "./Location/location.js";
import { historialTypeDefs, historialResolver } from "./Historial/historial.js";
import { groupTypeDefs } from "./Group/group.js";
import { dayTypeDefs, dayResolver } from "./Day/day.js";
import { workOrderTypeDefs, workOrderResolver } from "./WorkOrder/WorkOrder.js";
import { dayEventsTypeDefs } from "./DayEvent/dayEvent.js";

const rootTypeDefs = gql`
  type Query {
    _: String
  }
  type Mutation {
    _: String
  }
`;

export const resolver = [
  userResolver,
  tecnicoResolver,
  locationResolver,
  maquinaResolver,
  eventResolver,
  proveedorResolver,
  ownerResolver,
  historialResolver,
  workOrderResolver,
  dayResolver,
  eventResolver,
];

export const typeDefs = [
  rootTypeDefs,
  userTypeDefs,
  tecnicoTypeDefs,
  eventTypeDefs,
  proveedorTypeDefs,
  ownerTypeDefs,
  maquinaTypeDefs,
  locationTypeDefs,
  historialTypeDefs,
  groupTypeDefs,
  dayTypeDefs,
  workOrderTypeDefs,
  dayEventsTypeDefs,
];
