import AssessmentService from "../services/assessementService.js";

const AssessmentController = {
  createAssessment: async (req, resp, next) => {
    const data = await AssessmentService.createAssessment(req.body);
    return resp.status(200).json({
      assessement: data,
    });
  },

  getAssessements: async (req, resp, next) => {
    const data = await AssessmentService.getAssessements();
    return resp.status(200).json({
      assessement: data,
    });
  },
};

export default AssessmentController;
