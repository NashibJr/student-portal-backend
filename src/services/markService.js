import Mark from "../models/marks.js";
import Student from "../models/student.js";

const MarkService = {
  createMark: async (markData) => {
    try {
      // initialise the markData
      const { student, year, term, subject } = markData;

      // check if the student is registered with the school
      const exist = await Student.findOne({ _id: student });
      if (!exist) {
        return {
          message:
            "The student with that student number is not registered with school",
        };
      }

      // prevent a subject from having more than one mark in the same term and year and for the
      // same student.
      const _mark = await Mark.findOne({ student, year, term, subject });
      if (_mark) {
        return { message: "Mark for that subject already exists" };
      }
      // get the student's name.
      const { fullname, _class } = exist;
      let mark__ = await Mark.create({
        ...markData,
        studentName: fullname,
        _class: _class,
      });
      mark__ = mark__.toJSON();
      return { ...mark__, message: "Mark successfully added." };
    } catch (error) {
      return {
        message: error.message,
      };
    }
  },

  getMarks: async () => {
    try {
      return await Mark.find({}).sort({ year: 1, term: 1 });
    } catch (error) {
      return {
        message: error.message,
      };
    }
  },
};

export default MarkService;
