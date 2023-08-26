import { Schema, model } from "mongoose";

const daySchema = new Schema({
  date: {
    type: Date,
    require: true,
  },
  isClosed: {
    type: Boolean,
    default: false,
  },
});

export default model("Day", daySchema);
