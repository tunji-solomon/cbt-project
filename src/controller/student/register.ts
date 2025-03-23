import { StudentService } from "../../services";
import { Request, Response } from "express";
import { StudentSChema } from "../../schema"; 

const register = async (req : Request, res : Response) : Promise<any> => {

    try {

        const { error } = StudentSChema.register(req.body)
        if( error ) return res.status(400).json({
            status : 'Failed',
            message : error.details[0].context?.label === "confirm" ?
                    "password and confirm password missmatch" :
                    error.details[0].context?.label
        })
        const register = await StudentService.register(req.body, res)
        return register
        
    } catch (error : any) {
        console.log('Error:', error.message)
        return res.status(400).json({
            status : 'Failed',
            message : 'Something went wrong. Please try agin later'
        })
        
    }

}

export default register