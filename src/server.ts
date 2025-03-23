import express, { Request, Response} from "express"
import { env } from './config'
import router from "./router"
const app = express()
const port = env.PORT
app.use (express.json())

app.use('/', router )

app.get('', (req : Request, res : Response)=> {
    res.status(200).json({
        status : 'Success',
        message : 'Welcome to CBT Home page'

    })
})
app.listen(port, ()=>{
    console.log(`App is running on port: ${port}`)
})

