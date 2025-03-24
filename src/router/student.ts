import { StudentController} from "../controller";
import { Router } from "express";

const router = Router()

router.post('/register', StudentController.register)
router.post('/login', StudentController.login)

export default router