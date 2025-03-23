import { StudentController} from "../controller";
import { Router } from "express";

const router = Router()

router.post('/register', StudentController.register)

export default router