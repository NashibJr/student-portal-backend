import MarkService from "../services/markService.js";

const MarkController = {
  createMark: async (req, resp, next) => {
    const data = await MarkService.createMark(req.body);
    return resp.status(200).json({
      mark: data,
    });
  },

  getMarks: async (req, resp, next) => {
    const data = await MarkService.getMarks();
    return resp.status(200).json({
      marks: data,
    });
  },
};

export default MarkController;
