import StudentService from "../services/studentService.js";
import JWT from "jsonwebtoken";

const StudentController = {
  registerStudent: async (req, resp, next) => {
    const data = await StudentService.registerStudent(req.body);
    return resp.status(200).json({
      student: data,
    });
  },

  getStudents: async (req, resp, next) => {
    const data = await StudentService.getStudents();
    return resp.status(201).json({
      students: data,
    });
  },

  login: async (req, resp, next) => {
    const data = await StudentService.loginStudents(req.body);
    return resp.status(200).json({
      student: data,
    });
  },

  dashboard: async (req, resp, next) => {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const payload = JWT.verify(token, process.env.JWT_TOKEN_CONFIG);
      const { _id } = payload;
      const data = await StudentService.dashboard(_id);
      return resp.status(201).json({
        student: data,
      });
    } catch (error) {
      return resp.status(500).json({
        message: error.message,
      });
    }
  },
};

export default StudentController;
