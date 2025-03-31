import { NextFunction, Response } from "express";
import { checkToken } from "../utils";
import jwt,{ TokenExpiredError} from "jsonwebtoken";
import { env } from "../config";

export const verifyToken = (req : any, res : any, next : NextFunction) => {

    const token = checkToken(req)
    if(!token ) return res.status(400).json({
        status : 'Failed',
        message : 'Token not present in header'
    })
    try {
        const verifiedToken = jwt.verify(token,String(env.JWT_SECRET) )
        res.locals.user = verifiedToken
        next()
    } catch (error) {
        if(error instanceof TokenExpiredError){
            return res.status(400).json({
                status : "Failed",
                message : "Token has expired. please login again."
            })
        }
        return res.status(400).json({
            status : 'Failed',
            message : 'Invalid token',
            badToken : true
        }) 
    }
}

export const isAdmin = (req : any, res : Response, next : NextFunction) : any => {

    const { role } = res.locals.user

    if (role !== 'admin') return res.status(400).json({
        status : 'Failed',
        message : 'Authorization denied. Permission not granted'
    })

    next()
}