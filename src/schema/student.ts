import Joi from "joi";
import { StudentPayload } from "../interface";

const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,20}$/

export const register = (payload : StudentPayload) => {
    const schema : Joi.ObjectSchema = Joi.object({
        firstname : Joi.string().label("Firstname is required").required(),
        lastname : Joi.string().label("lastname is required").required(),
        middlename : Joi.string(),
        email : Joi.string()
                .label('Valid email is required')
                .email({minDomainSegments : 2, tlds : {allow : ["com", "ng", "io"]}})
                .required(),
        gender : Joi.string().label("Gender is required").required(),
        dept : Joi.string().label("Department is required").required(),
        password : Joi.string().label('Invalid password').pattern(passwordRegex).required(),
        confirm : Joi.ref('password')
    }).with('password', 'confirm')

    return schema.validate(payload)
}

export const login = (payload : StudentPayload) => {
    const schema : Joi.ObjectSchema = Joi.object({
        regNum : Joi.string().label('Registration number is required').required(),
        password : Joi.string().label('Invalid password').pattern(passwordRegex).required()
    })

    return schema.validate(payload)
}

