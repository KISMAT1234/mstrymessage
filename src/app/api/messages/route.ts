import dbConnect from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/option";
import { User } from "next-auth";
import UserModel from "@/model/User";

export async function POST(request: Request){  // Accepting messages
    await dbConnect()
    const session = await getServerSession(authOptions)
    console.log(session,"session accept mesage")
    const user: User = session?.user as User
    console.log(user,"user check")
    
    if(!session || !session.user){
        return Response.json(
            {
                success: false,
                message: "Not Authenticated"
            },
            {status: 401}
        )
    }
    const userId = user._id
    console.log(userId,"user id")
    const {acceptMessages} = await request.json()
    try{
        const updatedUser = await UserModel.findByIdAndUpdate(
           userId,
           {isAcceptingMessages: acceptMessages},
           {new: true}
        )
        
        if(!updatedUser){
            return Response.json(
                {
                    success: false,
                    message: "failed to update user status to accept messages"
                },
                {status: 401}
            )
        }else{
            return Response.json(
                {
                    success: true,
                    message: "Message acceptance status updated successfully"
                },
                {status: 200}
            )   
        }
    }
    catch(error){
        console.log(" message",error)
        console.error('Error registering user', error);
        return Response.json(
          {
            success: false,
            message: 'Error accepting messages',
          },
          { status: 500 }
        );
    }
}

export async function GET(request: Request){
    await dbConnect()
    try{

    }
    catch(error){
        console.log("Error adding message",error)
    }
}