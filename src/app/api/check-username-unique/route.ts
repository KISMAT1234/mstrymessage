import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import {z} from "zod"
import { usernameValidation } from "@/schemas/signupSchema";

const UsernameQuerySchema = z.object({
    username: usernameValidation
})
// console.log(UsernameQuerySchema,'username validation')  //validating username using zod

export async function GET(request: Request){
    // localhost:3000/api/check?username=elonMusk
    await dbConnect()
    try{
      const {searchParams} = new URL(request.url)  // We just have to convert the req.url which is a string, into a url object using new URL() with req.url as the input
    //   console.log(searchParams,'getting uername query') // output = { 'username' => 'kismat' }
      const queryParam = {
        username: searchParams.get('username')  
      }
    //   console.log(queryParam,' query param') // output = { username: 'kismat' }
    //   Validate with zod
     const result = UsernameQuerySchema.safeParse(queryParam) //safeParse checks if queryParam meets the criteria specified in UsernameQuerySchema.
    //  console.log(result,'result of validation');  //output = { success: true, data: { username: 'kismat' } }
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
    //  console.log(username,'username value');  // output = kismat
     const existingVerifiedUser = await UserModel.findOne({username, isVerified: true})
    //  console.log( existingVerifiedUser,'user checking' )
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



