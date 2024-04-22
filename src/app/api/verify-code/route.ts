import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import {z} from "zod"
import { usernameValidation } from "@/schemas/signupSchema";


export async function POST(request: Request){
    await dbConnect()
    try{
       const {username, code} = await request.json();

       const decodedUsername = decodeURIComponent(username)
    }
    catch(error){
      console.error("Error verifying user", error)
      return Response.json({success:false,message:"Error verifying user"},
      {status:500}
      )
    }
}