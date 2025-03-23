import * as bycrpt from 'bcryptjs'

export const hashPassword = async (password : string) => {

    const salt = await bycrpt.genSalt(10)
    const hash = await bycrpt.hash(password, salt)
    if(!hash) return console.log("Error hashing passsword")
    return hash 
}

export const RegNumberGenerator = (dept : string) => {
    const length = 6
    const digits = '1234567890'
    const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    
    let code = "";
    //ensures atleast one digit is present
    code += digits.charAt(Math.floor(Math.random()*digits.length))
    
    for(let i = 1; i < length; i++){
        code += letters.charAt(Math.floor(Math.random() * letters.length))
    }
    //shuffle code to minimize chances of replica
    code = code.split("").sort(() => Math.random() - 0.5).join("")
    return `${dept}-${code}`
}