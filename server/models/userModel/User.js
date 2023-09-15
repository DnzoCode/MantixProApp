import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      require: true,
    },
    password: {
      type: String,
      trim: true,
      require: true,
    },
    role: {
      type: String,
      trim: true,
      set: (value) => {
        return value.toUpperCase();
      },
    },
    status: {
      type: String,
      trim: true,
      default: "Activo",
      require: true,
    },
    token: { type: String },
    isDeleted: { type: Boolean, defaults: false },
  },
  {
    timestamps: true,
  }
);

export default model("User", userSchema);
