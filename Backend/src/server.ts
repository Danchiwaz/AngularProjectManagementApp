import express, { NextFunction, Request, Response } from 'express';
import projectRouter from './Routes/projects';
import router from './Routes/users';
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express();
const corsOptions = {credentials:true, origin:process.env.URL || '*'}
 app.use(express.json());

 app.use(cors(corsOptions))

//  routes configuration 
 app.use('/users', router)
 app.use('/projects', projectRouter)
// end or route configurations 

 app.use((error:Error, req:Request, res:Response, next:NextFunction)=>{
    res.json({
        Error: error.message
    })
    
 })

 app.listen(5003, () =>{
    console.log("Server is Listening to port 5003");
    
 })