import { request, response } from "express"

const getHome = async (req: any, res: any): Promise<Response> =>{
    return res.json({
        message: " Welcome to our homepage"
    })

}


export default getHome