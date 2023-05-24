import mongoose, { Schema } from "mongoose";

const studentSchema = new Schema(
  {
    _id: {
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
    _class: {
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
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

studentSchema.virtual("marks", {
  ref: "Mark",
  localField: "_id",
  foreignField: "student",
  justOne: false,
});

const Student = mongoose.model("Student", studentSchema);

export default Student;
