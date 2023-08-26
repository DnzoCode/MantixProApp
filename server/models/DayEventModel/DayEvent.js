import { Schema, model } from "mongoose";

const dayEventSchema = new Schema(
  {
    day_id: {
      type: Schema.Types.ObjectId,
      ref: "Day",
      require: true,
    },
    event_id: {
      type: Schema.Types.ObjectId,
      ref: "Event",
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model("DayEvent", dayEventSchema);
