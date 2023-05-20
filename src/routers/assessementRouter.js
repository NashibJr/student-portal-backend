import { Router } from "express";
import AssessmentController from "../controllers/assessmentController.js";

const assessementRouter = Router();

assessementRouter.post("/assessements", AssessmentController.createAssessment);
assessementRouter.get("/assessements", AssessmentController.getAssessements);

export default assessementRouter;
