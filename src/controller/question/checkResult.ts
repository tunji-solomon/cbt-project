import { QuestionService } from "../../services";
import { Request, Response } from "express";

const checkResult = async (req : Request, res : Response): Promise<any> => {

    try {
        const result = await QuestionService.checkResult(res)
        return result
        
    } catch (error : any) {

        console.log(error.message)
        return res.status(400).json({
            status : 'Failed',
            message : 'Something went wrong. Please try agin later'
        })  
    }
}

export default checkResult