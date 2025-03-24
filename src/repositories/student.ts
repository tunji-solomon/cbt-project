import { Op } from "sequelize";
import { Student } from "../model";

class StudentRepo {
    
    async create (payload : any) : Promise<object>{
        return await Student.create(payload)
    }

    async findByParameter (parameter : any) : Promise<any>{
        return await Student.findOne({
            where : {
               [Op.or] : [
                {email : parameter},
                {regNum : parameter}
               ] 
            },

            attributes : {
                exclude : ["createdAt", "UpdatedAt"]
            }
        })
    }

    async getPassword (parameter : any) : Promise<any>{
        return await Student.scope("withPassword").findOne({
            where : {
               [Op.or] : [
                {email : parameter},
                {regNum : parameter}
               ] 
            },

            attributes : {
                exclude : ["createdAt", "UpdatedAt"]
            }
        })
    }
}

export default StudentRepo