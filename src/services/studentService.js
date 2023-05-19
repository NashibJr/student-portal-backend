import Student from "../models/student.js";
import * as bcrypt from "bcrypt";

const StudentService = {
  registerStudent: async (studentData) => {
    try {
      // check if the student's student number is already on the database
      const { studentNumber } = studentData;
      const exists = await Student.findOne({ studentNumber: studentNumber });
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
        message: "student successfully created!!",
      };
    } catch (error) {
      return {
        message: "An error has occured!!!!",
      };
    }
  },
};

export default StudentService;
