import { Schema, model } from "mongoose";

const markSchema = new Schema({
  student: {
    type: Schema.Types.Number,
    ref: "Student",
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  term: {
    type: Number,
    required: true,
  },
  studentName: {
    type: String,
    required: false,
  },
  _class: {
    type: String,
    required: false,
  },
  subject: {
    type: String,
    required: true,
  },
  mark: {
    type: Number,
    required: true,
  },
});

const Mark = model("Mark", markSchema);

export default Mark;
