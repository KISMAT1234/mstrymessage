import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import {z} from "zod"
import { usernameValidation } from "@/schemas/signupSchema";


export async function POST(request: Request){
    await dbConnect()
    try{
       const {username, code} = await request.json();  
      //  console.log(username, code);

       const decodedUsername = decodeURIComponent(username)  //Decodes a Uniform Resource Identifier (URI) component previously created by encodeURIComponent or by a similar routine
      //  console.log(decodedUsername,'decoding username')

       const user = await UserModel.findOne({username: decodedUsername})
      //  console.log(user,'user value')

       if(!user){
        return Response.json({success:false,message:"User not found"},
        {status:500})
       }
       const isCodeValid = user.verifyCode == code // Checking the user code and verification code
       const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date(); // Checking the expiry of code 
      //  console.log(isCodeNotExpired,'expiry checking')

       if(isCodeValid && isCodeNotExpired){
          user.isVerified = true;
          await user.save();

          return Response.json({
            success:true,
            message:"Account verified successfuly"},
          {status:200})
       } else if(!isCodeNotExpired){
          return Response.json({success:false,message:"Code has expired"},
          {status:400})
       } else{
        return Response.json({
            success:false,
            message:"Incorrect verification code"
        },
        {status:400})

       }

    }
    catch(error){
      console.error("Error verifying user", error)
      return Response.json({success:false,message:"Error verifying user"},
      {status:500}
      )
    }
}