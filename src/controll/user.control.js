import { Errorhandler, sendError } from "../service/errorHandler.service.js";
import bcrypt from "bcrypt"
import dotenv from"dotenv"
import { userModel } from "../module/user.model.js";
import  jwt  from "jsonwebtoken";
import { sendEmail } from "../utlis/nodemailer/nodemailer.utils.js";
dotenv.config()

export const signUp=Errorhandler(async(req,res)=>{
    const{password}=req.body
    const hashedPassword = bcrypt.hashSync(password,+process.env.SALT_ROUND)
    const signUpRes= await userModel.create({...req.body,password:hashedPassword})
    if(!signUpRes) throw new sendError(400,"Error in Sign Up");
    await sendEmail(signUpRes.email)
    res.status(200).json({
        message:"Sucusses",
        data:signUpRes
    })
})

export const logIn = Errorhandler(async(req,res)=>{
   const{email,password}=req.body
   const logInResult = await userModel.findOne({email})
   if(!logInResult)throw new sendError(400,"cant find email")
    const isMatch = bcrypt.compareSync(password,logInResult.password)
    if(!isMatch)throw new sendError(400,"Dont Match")
    const token = jwt.sign({name:logInResult.name,email:logInResult.email,_id:logInResult._id},process.env.SECRET_KEY)
    res.status(200).json({
        message:"secusses",
        data:logInResult,
        token
    })
})

export const ubdateAccountData = Errorhandler(async(req,res)=>{
    const {email:oldEmail}=req.docodedToken
    const{email,phone,address,name}= req.body
    const ubdateUser= await userModel.findOneAndUpdate({email:oldEmail},{email,phone,address,name})
    if(!ubdateUser)throw new sendError(400,"Error in ubdating account data")
     if(email){
         ubdateUser.verified=false;
         await ubdateUser.save()
         sendEmail(email)
     } 
     res.status(200).json({
     message:"sucesses",
     data : ubdateUser
     })
 })

 export const ubdatePassword = Errorhandler(async(req,res)=>{
    const {email}=req.docodedToken
    const{password}= req.body
    const hashedPassword = bcrypt.hashSync(password,+process.env.SALT_ROUNDS)
    const ubdateUser= await userModel.findOneAndUpdate({email},{password:hashedPassword})
    if(!ubdateUser)throw new sendError(400,"Error in ubdating password")
     res.status(200).json({
     message:"sucesses, to ubdate password",
     
     })
 })

 export const getMyAccounnData = Errorhandler(async(req,res)=>{
    const {email}=req.docodedToken
    const myAccount= await userModel.findOne({email},{password:0})
    if(!myAccount)throw new sendError(400,"Error in get my account data")
       
     res.status(200).json({
     message:"sucesses",
     data : myAccount
     })
 })


 export const verifyAccount = Errorhandler(async(req,res)=>{
    const {token}= req.params;
    const {email}= jwt.verify(token,process.env.SECRET_KEY)
    const verifyUser = await userModel.findOneAndUpdate({email},{verified:true})
    if(!verifyUser)throw new sendError(400,"Error in verfing account")
        res.status(200).json({
            message:"sucesses, account verfied",
        })
})


//reset password
//1-verify   2-OTP    3-new password

export const askResetPassword = Errorhandler(async(req,res)=>{
    const {email}=req.body;
    const findUser = await userModel.findOne({email});
    if (!findUser)throw new sendError(400,"Error in asking for reset password, email not found")
     sendEmailForresetPassword(findUser.email)
     res.status(200).json({
         message:"sucusses, check your email"
     })
 })
 
 export const resetPassword = Errorhandler(async(req,res)=>{
    const {email,otp,password}= req.body;
    const {otpToken}=req.params
    const {otp:docodedOtpToken}= jwt.verify(otpToken,process.env.SECRET_KEY)
    if(otp!==docodedOtpToken)throw new sendError(400,"Error in verifing otp")
     const hashedPassword = bcrypt.hashSync(password,+process.env.SALT_ROUNDS)
     const ubdateUser = await userModel.findOneAndUpdate({email},{password:hashedPassword})
     if(!ubdateUser) throw new sendError(400,"Error in reseting password")
     res.status(200).json({
     message:"sucusses to reset password"
 })
 })
