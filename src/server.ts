import express from "express"
import { env } from './config'
const app = express()
const port = env.PORT

app.listen(port, ()=>{
    console.log(`App is running on port: ${port}`)
})

