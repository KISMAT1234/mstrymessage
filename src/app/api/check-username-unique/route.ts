import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import {z} from "zod"
import { usernameValidation } from "@/schemas/signupSchema";

const UsernameQuerySchema = z.object({
    username: usernameValidation
})
console.log(UsernameQuerySchema,'username validation')  //validating username using zod

export async function GET(request: Request){
    // if(request.method !== 'GET'){
    //     return Response.json({
    //         success: false,
    //         message:'Method not allowed',
    //     },
    //     {status: 405})
    // }
    // localhost:3000/api/check?username=elon
    await dbConnect()
    try{
      const {searchParams} = new URL(request.url)  // Getting query parameters from url to check username
      console.log(searchParams,'getting uername query')
      const queryParam = {
        username: searchParams.get('username')  

      }
      console.log(searchParams,'')

    //   Validate with zod
     const result = UsernameQuerySchema.safeParse(queryParam) //safeParse checks if queryParam meets the criteria specified in UsernameQuerySchema.
     console.log(result,'result of validation');

     if(!result.success){
        const usernameErrors = result.error.format().username?._errors || []
        return Response.json({
            success: false,
            message: usernameErrors?.length > 0 ? usernameErrors.join(', ') : 'Invalid query parameters',
        },
        {
            status:400
        })
     }

     const {username} = result.data

     const existingVerifiedUser = await UserModel.findOne({ username, isVerified: true})

     if(existingVerifiedUser){
        return Response.json({
            success: false,
            message: 'Username is already taken'
        },
        {
            status:400
        })
     }

     return Response.json({
        success: true,
        message: 'Username is unique',
    },
    {
        status:200
    })

    }
    catch(err){
        console.log(err);
        return Response.json({success:false,message:"Error checking username"},
        {status:500}
        )
    }
}



