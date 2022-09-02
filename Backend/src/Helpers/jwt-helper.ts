import jwt from 'jsonwebtoken';
import dotenv from "dotenv";

require("dotenv").config();


export const jwtTokens = ({user_id,username,email, role}:{user_id:string,username:string,email:string ,password:string,role:string}) =>{
    const user = {user_id,username, email, role};
    const accessToken = jwt.sign(
      user,
      process.env.USER_ACCESS_TOKEN as string,
      { expiresIn: "120m" }
    );

    return accessToken ;
}