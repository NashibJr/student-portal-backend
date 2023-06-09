import Student from "../models/student.js";
import * as bcrypt from "bcrypt";
import JWT from "jsonwebtoken";

const StudentService = {
  registerStudent: async (studentData) => {
    try {
      // check if the student's student number is already on the database
      const { _id } = studentData;
      const exists = await Student.findOne({ _id: _id });
      if (exists) {
        return {
          message:
            "Student number aleady exists, can't register another student with the same student number",
        };
      }
      // else we register the student.

      const hashedPassword = await bcrypt.hash(studentData.password, 10);
      let student = await Student.create({
        ...studentData,
        password: hashedPassword,
      });
      student = student.toJSON();
      const { password, ...rest } = student;
      return {
        ...rest,
        message: "student successfully registered!!",
      };
    } catch (error) {
      return {
        message: "An error has occured!!!!",
      };
      console.log(error);
    }
  },

  getStudents: async () => {
    try {
      const students = await Student.find({})
        .populate(["marks"])
        .sort({ fullname: 1 })
        .select("fullname _class marks house");
      return students;
    } catch (error) {
      return {
        message: error.message,
      };
    }
  },

  loginStudents: async (studentCredentials) => {
    // initialise the studentCredentials
    const { password } = studentCredentials;
    // check if the student exists on the school's database
    let student = await Student.findOne({ _id: studentCredentials._id }).select(
      "password fullname"
    );
    if (!student) {
      return {
        message: "This student number is not recognized.",
      };
    }
    // else we check if they've provided the correct password.
    const checkPassword = await bcrypt.compare(password, student.password);
    if (!checkPassword) {
      return {
        message: "Wrong password submitted.",
      };
    }
    // else we generate a token
    const { _id, fullname } = student;
    const token = JWT.sign({ _id, fullname }, process.env.JWT_TOKEN_CONFIG, {
      expiresIn: "24h",
    });
    student = student.toJSON();
    delete student.password;

    return { ...student, token: token };
  },

  dashboard: async (studentId) => {
    try {
      const student = await Student.findOne({ _id: studentId })
        .populate([
          {
            path: "marks",
            select: "year term subject mark",
          },
        ])
        .select("fullname class marks");
      return student;
    } catch (error) {
      return {
        message: error.message,
      };
    }
  },

  deleteStudent: async (studentId) => {
    try {
      // check if the student exists
      const exists = await Student.findById(studentId);
      if (!exists) {
        return {
          message: "No such student",
        };
      }
      await Student.findByIdAndDelete(studentId);
      return {
        message: "successfully deleted",
      };
    } catch (error) {
      return {
        message: error.message,
      };
    }
  },
};

export default StudentService;
