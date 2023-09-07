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
    $title: String
    $start: String
    $end: String
    $maquina: ID
    $tecnicoId: ID
    $proveedor: ID
    $turno: String
    $ejecucion: String
    $mensajeReprogramado: String
  ) {
    createEvent(
      title: $title
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
