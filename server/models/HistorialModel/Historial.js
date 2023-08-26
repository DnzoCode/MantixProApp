import { Schema, model } from "mongoose";

const historialSchema = new Schema(
  {
    event_id: {
      type: Schema.Types.ObjectId,
      ref: "Event",
      require: true,
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    mantenimiento_status: {
      type: String,
      trim: true,
    },
    mantenimiento_date: {
      type: Date,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model("Historial", historialSchema);
