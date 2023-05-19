import JWT from "jsonwebtoken";
import Student from "../models/student.js";

const authorization = async (req, resp, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const payload = JWT.verify(token, process.env.JWT_TOKEN_CONFIG);
    const { _id } = payload;
    const student = await Student.findById(_id);
    if (!student) {
      return resp.status(500).json({
        message: "You're not authorized",
      });
    }
    return next();
  } catch (error) {
    return resp.status(500).json({
      message: error.message,
    });
  }
};

export default authorization;
