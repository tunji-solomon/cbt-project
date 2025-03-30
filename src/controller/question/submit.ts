import { QuestionService } from "../../services";
import { Request, Response } from "express";

const submit = async (req : Request, res : Response) : Promise<any> => {

    try {
        const submit = await QuestionService.submit(res)
        return submit 
    } catch (error : any) {
        console.log('Error:', error.message)
        return res.status(400).json({
            status : 'Failed',
            message : 'Something went wrong. Please try agin later'
        })        
    }
}

export default submit