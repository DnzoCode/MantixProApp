import { Schema, model } from "mongoose";

const maquinaSchema = new Schema(
  {
    maquina_name: {
      type: String,
      trim: true,
      require: true,
    },
    maquina_modelo: {
      type: String,
      trim: true,
    },
    numero_serial: {
      type: String,
      trim: true,
    },
    maquina_location: {
      type: Schema.Types.ObjectId,
      ref: "Location",
    },
    ultimo_mantenimiento: {
      type: Date,
      trim: true,
    },
    status: {
      type: String,
      trim: true,
      default: "Activo",
      require: true,
    },
    isDeleted: { type: Boolean, defaults: false },
  },
  {
    timestamps: true,
  }
);

export default model("Maquina", maquinaSchema);
