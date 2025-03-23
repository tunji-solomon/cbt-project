import { StudentRepo } from "../repositories";
import { Response } from "express";
import { RegNumberGenerator } from "../utils";

class StudentService {

    private readonly studentRepo;
    constructor(){
        this.studentRepo = new StudentRepo()
    }

    async register (payload : any, res : Response) : Promise<object> {
        const { email, dept } = payload;
        const EmailExist = await this.studentRepo.findByParameter(email)
        if(EmailExist) return res.status(400).json({
            status : 'Failed',
            message : 'User with email already exist'
        })

        payload.regNum = RegNumberGenerator(dept)
        this.studentRepo.create(payload)
        return res.status(201).json({
            status : 'Success',
            message : `${payload.lastname} registered succesfully`
        })

    }
}

export default new StudentService();