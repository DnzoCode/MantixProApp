import { gql } from "@apollo/client";

export const CREATE_WORKORDER = gql`
  mutation (
    $eventId: ID
    $workOrder: String
    $horaInicio: String
    $diagnostico: String
    $trabajoRealizado: String
  ) {
    createWorkOrder(
      event_id: $eventId
      work_order: $workOrder
      hora_inicio: $horaInicio
      diagnostico: $diagnostico
      trabajo_realizado: $trabajoRealizado
    ) {
      _id
      event_id {
        _id
        start
        end
        status
        ejecucion
        mensaje_reprogramado
        maquina {
          _id
          maquina_name
          maquina_modelo
          numero_serial
        }
        tecnico_id {
          _id
          tecnico_name
          tecnico_apellido
        }
      }
    }
  }
`;

export const CERRAR_WORKORDER = gql`
  mutation (
    $eventId: ID
    $owner: ID
    $actividades: String
    $causas: String
    $horaFin: String
    $observacion: String
  ) {
    cerrarWorkOrder(
      event_id: $eventId
      owner: $owner
      actividades: $actividades
      causas: $causas
      hora_fin: $horaFin
      observacion: $observacion
    ) {
      _id
      observacion
      trabajo_realizado
    }
  }
`;
