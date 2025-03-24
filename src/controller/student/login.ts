import { StudentService } from "../../services";
import { StudentSChema } from "../../schema/";
import { Request, Response } from "express";

const login = async (req : Request, res : Response) : Promise<any> => {

    try {
        const { error } = StudentSChema.login(req.body);
        if( error ) return res.status(400).json({
            status : 'Failed',
            message : error.details[0].context?.label === "confirm" ?
                    "password and confirm password missmatch" :
                    error.details[0].context?.label
        })
    
        const login = await StudentService.login(req.body, res)
        return login
        
    } catch (error : any) {
        console.log(error.message)
        return res.status(400).json({
            status : 'Failed',
            message : 'Something went wrong. Please try agin later'
        })  
    }
}

export default login