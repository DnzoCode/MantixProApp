import { Schema, model } from "mongoose";
const workOrderSchema = new Schema(
  {
    work_order: {
      type: String,
      trim: true,
      require: true,
    },
    event_id: {
      type: Schema.Types.ObjectId,
      ref: "Event",
      require: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "Encargado",
      require: true,
    },
    tecnico_id: {
      type: Schema.Types.ObjectId,
      ref: "Tecnico",
      require: true,
    },
    trabajo_realizado: {
      type: String,
      trim: true,
      require: true,
    },
    diagnostico: {
      type: String,
      trim: true,
      require: true,
    },
    actividades: {
      type: String,
      trim: true,
      require: true,
    },
    hora_inicio: {
      type: String,
      trim: true,
      require: true,
    },
    hora_fin: {
      type: String,
      trim: true,
      require: true,
    },
    causas: {
      type: String,
      trim: true,
      require: true,
    },
    observacion: {
      type: String,
      trim: true,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model("WorkOrder", workOrderSchema);
