import Joi from "joi";
import { StudentPayload } from "../interface";

export const register = (payload : StudentPayload) => {
    const schema : Joi.ObjectSchema = Joi.object({
        firstname : Joi.string().label("Firstname is required").required(),
        lastname : Joi.string().label("lastname is required").required(),
        middlename : Joi.string(),
        age : Joi.number().label("Age is required").required(),
        email : Joi.string()
                .label('Valid email is required')
                .email({minDomainSegments : 2, tlds : {allow : ["com", "ng", "io"]}})
                .required(),
        gender : Joi.string().label("Gender is required").required(),
        dept : Joi.string().label("Department is required").required(),
        password : Joi.string().label('Password is required').required(),
        confirm : Joi.ref('password')
    }).with('password', 'confirm')

    return schema.validate(payload)
}

