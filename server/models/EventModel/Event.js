import { Schema, model } from "mongoose";

const eventSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      default: "Mantenimiento",
    },
    start: {
      type: Date,
      trim: true,
      require: true,
    },
    end: {
      type: Date,
      trim: true,
      require: true,
    },
    description: {
      type: String,
      trim: true,
      default: null,
    },
    maquina: {
      type: Schema.Types.ObjectId,
      ref: "Maquina",
    },
    tecnico_id: {
      type: Schema.Types.ObjectId,
      ref: "Tecnico",
      default: null,
    },
    ejecucion: {
      type: String,
      trim: true,
      require: true,
    },
    proveedor_id: {
      type: Schema.Types.ObjectId,
      ref: "Proveedor",
      default: null,
    },
    mensaje_reprogramado: {
      type: String,
      trim: true,
      default: null,
    },
    turno: {
      type: String,
      trim: true,
      require: true,
    },
    status: {
      type: String,
      trim: true,
      default: "Programado",
      require: true,
    },
    isDeleted: { type: Boolean, defaults: false },
  },
  {
    timestamps: true,
  }
);

export default model("Event", eventSchema);
