import StudentService from "../services/studentService.js";

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
};

export default StudentController;
