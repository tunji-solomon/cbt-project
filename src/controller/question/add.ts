import { QuestionService } from "../../services";
import { Request, Response } from 'express'

const addQuestion = async ( req : Request, res : Response ) : Promise<any> => {
    try {
        const add :any = await QuestionService.add(req.body, res)
        return add
        
    } catch (error : any) {
        console.log(error.message)
        return res.status(400).json({
            status : 'Failed',
            message : 'Something went wrong. Please try agin later'
        })
        
    }
}

export default addQuestion