import { Schema, model } from "mongoose";

const tecnicoSchema = new Schema(
  {
    tecnico_name: {
      type: String,
      trim: true,
      require: true,
    },
    tecnico_apellido: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model("Tecnico", tecnicoSchema);