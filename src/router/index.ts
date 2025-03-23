import { Router } from "express";
import studentRoute from './student'

const router = Router()

router.use('/student', studentRoute)

export default router

