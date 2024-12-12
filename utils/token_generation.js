import jwt from "jsonwebtoken"
const GenerateToken = (data)=>{
    const token = jwt.sign({_id:data},process.env.JWT_SECRET,{
        expiresIn:'30d'
    })
    return token;
}; 

export default GenerateToken