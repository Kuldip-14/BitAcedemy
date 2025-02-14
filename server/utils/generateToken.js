import jwt from "jsonwebtoken";

export const generateToken= (res , user , message)=>{
    const token= jwt.sign({userId: user._id})
}