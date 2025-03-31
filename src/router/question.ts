import { Router } from "express";
import { QuestionController } from "../controller";
import { verifyToken, isAdmin } from "../middleware";

const router = Router()

router.post ('/add', verifyToken, isAdmin, QuestionController.addQuestion);
router.get ('/fetchall', verifyToken, QuestionController.fetchAllQusetion)
router.post ('/attempt', verifyToken, QuestionController.attemptQuestion)
router.post ('/submit', verifyToken, QuestionController.submit)
router.get ('/result', verifyToken, QuestionController.checkResult)

export default router