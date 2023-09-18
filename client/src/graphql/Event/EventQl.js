import { gql } from "@apollo/client";

export const GET_EVENTS = gql`
  query getEvents {
    events {
      _id
      start
      end
      status
      maquina {
        _id
        maquina_name
        numero_serial
        maquina_modelo
        maquina_location {
          _id
          location_name
        }
      }
      description
      ejecucion
      tecnico_id {
        _id
        tecnico_name
        tecnico_apellido
      }
      proveedor {
        _id
        name_proveedor
        telefono
        contacto
      }
      turno
    }
  }
`;

export const GET_EVENT = gql`
  query getEvent($id: ID!) {
    event(_id: $id) {
      _id
      start
      end
      status
      maquina {
        _id
        maquina_name
        numero_serial
        maquina_modelo
        maquina_location {
          _id
          location_name
        }
      }
      description
      ejecucion
      tecnico_id {
        _id
        tecnico_name
        tecnico_apellido
      }
      proveedor {
        _id
        name_proveedor
        telefono
        contacto
      }
    }
  }
`;

export const CREATE_EVENTS = gql`
  mutation (
    $start: Date
    $end: String
    $maquina: ID
    $tecnicoId: ID
    $proveedor: ID
    $turno: String
    $ejecucion: String
    $mensajeReprogramado: String
  ) {
    createEvent(
      start: $start
      end: $end
      maquina: $maquina
      tecnico_id: $tecnicoId
      proveedor: $proveedor
      turno: $turno
      ejecucion: $ejecucion
      mensaje_reprogramado: $mensajeReprogramado
    ) {
      _id
      start
      end
      status
    }
  }
`;

export const GET_EVENT_FECHA = gql`
  query ($start: String!) {
    eventPorFecha(start: $start) {
      _id
      start
      end
      status
      maquina {
        _id
        maquina_name
        numero_serial
        maquina_modelo
        maquina_location {
          _id
          location_name
        }
      }
      description
      ejecucion
      tecnico_id {
        _id
        tecnico_name
        tecnico_apellido
      }
      proveedor {
        _id
        name_proveedor
        telefono
        contacto
      }
      turno
    }
  }
`;

export const REPROGRAMAR_EVENT = gql`
  mutation (
    $id: ID!
    $start: Date
    $end: String
    $mensajeReprogramado: String
    $status: String
  ) {
    reprogramarEvent(
      _id: $id
      start: $start
      end: $end
      mensaje_reprogramado: $mensajeReprogramado
      status: $status
    ) {
      _id
      start
      status
      mensaje_reprogramado
    }
  }
`;

export const EJECUTAR_EVENT = gql`
  mutation ($id: ID!, $status: String, $tecnicoId: ID) {
    ejecutarEvent(_id: $id, status: $status, tecnico_id: $tecnicoId) {
      _id
      ejecucion
      tecnico_id {
        _id
        tecnico_name
        tecnico_apellido
      }
    }
  }
`;
export const COMPLETAR_EVENT = gql`
  mutation ($id: ID!, $status: String) {
    completarEvent(_id: $id, status: $status) {
      _id
      ejecucion
    }
  }
`;
