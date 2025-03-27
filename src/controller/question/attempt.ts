import { QuestionService } from "../../services";
import { Request, Response } from 'express'

const attemptQuestion = async (req : Request, res : Response) : Promise<any> => {

    const { questionId } = req.query
    try {
        const answer = await QuestionService.answerQuestions(req.body, questionId as string, res)
        return answer  
    } catch (error : any ) {
        console.log(error.message)
        return res.status(400).json({
            status : 'Failed',
            message : 'Something went wrong. Please try agin later'
        })   
    }
}

export default attemptQuestion