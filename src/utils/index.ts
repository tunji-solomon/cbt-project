import * as bycrpt from 'bcryptjs'
import * as jwt from 'jsonwebtoken'
import { env } from '../config'

export const hashPassword = async (password : string) : Promise<string> => {

    const salt = await bycrpt.genSalt(10)
    const hash = await bycrpt.hash(password, salt)
    return hash 
}

export const comparePassword = async (hashedPassword : string, plainPassword : string) : Promise<boolean> => {
    return bycrpt.compare(plainPassword, hashedPassword)
}

export const generateToken = (payload : any, time : any) : string => {
    const token = jwt.sign({payload}, String(env.JWT_SECRET), { expiresIn : time})
    return token
}


export const RegNumberGenerator = (dept : string) => {
    const length = 7
    const digits = '1234567890'
    
    let code = "";
    
    for(let i = 1; i < length; i++){
        code += digits.charAt(Math.floor(Math.random() * digits.length))
    }
    //shuffle code to minimize chances of replica
    code = code.split("").sort(() => Math.random() - 0.5).join("")
    return `${dept}-${code}`
}