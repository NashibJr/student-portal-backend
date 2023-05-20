import { Schema, model } from "mongoose";

const assessementSchema = new Schema({
  year: {
    type: Number,
    required: true,
  },
  term: {
    type: Number,
    required: true,
  },
  results: {
    type: Array,
    required: false,
  },
});

const Assessement = model("Assessment", assessementSchema);

export default Assessement;
