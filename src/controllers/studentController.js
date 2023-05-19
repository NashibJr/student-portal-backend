import StudentService from "../services/studentService.js";

const StudentController = {
  registerStudent: async (req, resp, next) => {
    const data = await StudentService.registerStudent(req.body);
    return resp.status(200).json({
      student: data,
    });
  },
};

export default StudentController;
