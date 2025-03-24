import { StudentRepo } from "../repositories";
import { Response } from "express";
import { RegNumberGenerator, comparePassword, generateToken } from "../utils";
import { PassThrough } from "stream";

class StudentService {

    private readonly studentRepo;
    constructor(){
        this.studentRepo = new StudentRepo()
    }

    async register (payload : any, res : Response) : Promise<object> {
        const { email, dept } = payload;

        const deptCodeList = [
            {dept : 'science', code : 'SC'},
            {dept : 'commercial', code : 'CM'},
            {dept : 'art', code : 'AR'}
        ]
        const EmailExist = await this.studentRepo.findByParameter(email)
        if(EmailExist) return res.status(400).json({
            status : 'Failed',
            message : 'User with email already exist'
        })

        const deptCode : any = deptCodeList.find(item => item.dept === dept)?.code 
        payload.regNum = RegNumberGenerator(deptCode)

        const student : any = await this.studentRepo.create(payload)
        const strignifiedUser = student.toJSON()
        delete strignifiedUser.password

        return res.status(201).json({
            status : 'Success',
            message : `${payload.lastname} registered succesfully`,
            data : strignifiedUser
        })
    }
    

    async login (payload : any, res : Response) : Promise<object> {
        const { regNum, password } = payload;

        const user : any = await this.studentRepo.getPassword(regNum);
        if(!user) return res.status(404).json({
            status : 'Failed',
            message : `User with registration number:${regNum} not found`
        })


        const passwordValid : any = await comparePassword(user?.password, password)
        if(!passwordValid) return res.status(400).json({
            status : 'Failed',
            message : 'Password is incorrect, please try again'
        })

        const token = generateToken(
            {
                id : user?.id,
                lastname : user?.lastname,
                regNumber : user?.regNum,
                dept : user?.dept
            },
            '1hr'
        )

        const strignifiedUser = user.toJSON()
        delete strignifiedUser?.password

        return res.status(200).json({
            status : 'Success',
            message : "Login successful",
            data : {
                user : strignifiedUser,
                token
            }
        })
    }
}

export default new StudentService();