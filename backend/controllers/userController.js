import { generateAccessToken, generateRefreshToken } from "../helperFunctions/tokenHelper.js"
import User from '../model/userModel.js'

export const checkUserEmail = async(req,res) =>{
    try{
        const { email,name } = req.body
        let userData = await User.findOne({email})
        if (!userData) {
            userData = new User({
                email,
                name
            });
            await userData.save();
        }
        const userPayload = { email ,name};
        const accessToken = generateAccessToken(userPayload)
        const refreshToken = generateRefreshToken(userPayload)
        res.status(200).json({emailExists: true,accessToken,refreshToken,message: "Email is registered"})
    }catch(error){
        console.log(error)
        return res.status(500).json({message:"Internal Server Error."})
    }
}
