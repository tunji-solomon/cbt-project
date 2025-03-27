import { Router } from "express";
import studentRoute from './student'
import questionRoute from './question'

const router = Router()

router.use('/student', studentRoute);
router.use('/question', questionRoute)

export default router

