import Assessement from "../models/assessment.js";
import Student from "../models/student.js";

const AssessmentService = {
  createAssessment: async (assessementData) => {
    try {
      // initialize the assessementData
      const { year, term } = assessementData;
      // check if the assessement for that term and year exist
      const exists = await Assessement.findOne({ year, term });
      // deny its creation if it exists already
      if (exists) {
        return {
          message: `Assessement for ${term || year} exists`,
        };
      }
      // retrieve all the students and their results
      let students = await Student.find({})
        .populate(["marks"])
        .select("_id fullname");
      // get students with marks
      students = students.filter((student) => student.marks.length > 0);
      // retrieve the results for that term and year.
      const marks = students.map((student) => student.marks);
      const results = marks.filter(
        (mark, index) => mark[index].term === term && mark[index].year === year
      );
      // create the assessement .
      // we can't create an assessement with empty results
      if (results.length === 0) {
        return {
          message:
            "No results for the term entered. Can't create an assessement with no results",
        };
      }
      let assessement = await Assessement.create({ year, term, results });
      assessement = assessement.toJSON();
      return {
        ...assessement,
        message: "successfully created the assessement",
      };
    } catch (error) {
      return { message: error.message };
    }
  },

  getAssessements: async () => {
    try {
      const data = await Assessement.find({});
      return data;
    } catch (error) {
      return {
        message: error.message,
      };
    }
  },
};

export default AssessmentService;
