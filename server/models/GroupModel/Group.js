import { Schema, model } from "mongoose";

const groupSchema = new Schema(
  {
    group_name: {
      type: String,
      trim: true,
      set: function (value) {
        return value.toUpperCase();
      },
      require: true,
    },
    status: {
      type: String,
      trim: true,
      default: "Activo",
      require: true,
    },
  },
  {
    timestamps: true,
  }
);
export default model("Group", groupSchema);
