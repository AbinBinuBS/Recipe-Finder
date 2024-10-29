import { generateAccessToken, generateRefreshToken } from "../helperFunctions/tokenHelper.js"


export const checkUserEmail = (req,res) =>{
    try{
        const email = req.body.email
        console.log(email)
        const userPayload = { email };
        const accessToken = generateAccessToken(userPayload)
        const refreshToken = generateRefreshToken(userPayload)
        res.status(200).json({emailExists: true,accessToken,refreshToken,message: "Email is registered"})
    }catch(error){
        console.log(error.message)
        return res.status(500).json({message:"Internal Server Error."})
    }
}
