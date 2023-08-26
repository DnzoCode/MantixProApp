import { Schema, model } from "mongoose";

const locationSchema = new Schema(
  {
    location_name: {
      type: String,
      require: true,
      unique: true,
      trim: true,
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

export default model("Location", locationSchema);
