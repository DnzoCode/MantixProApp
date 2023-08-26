import { Schema, model } from "mongoose";

const ownerProcessSchema = new Schema(
  {
    encargado_name: {
      type: String,
      trim: true,
      require: true,
    },
    encargado_apellido: {
      type: String,
      trim: true,
      require: true,
    },
    encargado_location: {
      type: Schema.Types.ObjectId,
      ref: "Location",
      require: true,
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

export default model("OwnerProcess", ownerProcessSchema);
