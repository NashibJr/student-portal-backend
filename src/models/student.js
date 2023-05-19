import mongoose, { Schema } from "mongoose";

const studentSchema = new Schema(
  {
    studentNumber: {
      type: Number,
      required: true,
    },
    fullname: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    class: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    house: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Student = mongoose.model("Student", studentSchema);

export default Student;
