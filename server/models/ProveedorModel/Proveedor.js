import { Schema, model } from "mongoose";

const proveedorSchema = new Schema(
  {
    name_proveedor: {
      type: String,
      trim: true,
      require: true,
    },
    contacto: {
      type: String,
      trim: true,
    },
    telefono: {
      type: Number,
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

export default model("Proveedor", proveedorSchema);
