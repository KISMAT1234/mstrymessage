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
    // console.log{acceptMessages,'messages send from frontend'}
  
    try{
        const updatedUser = await UserModel.findByIdAndUpdate(
           userId,
           {isAcceptingMessages: acceptMessages},
           {new: true}
        )
        console.log(updatedUser,'updated user')
        
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
    const session = await getServerSession(authOptions)
    console.log(session,"session ")
    const user: User = session?.user
        
    if(!session || !session.user){
        return Response.json(
            {
                success: false,
                message: "Not Authenticated"
            },
            {status: 401}
        )
    }


    try{
        const userId = user._id
        const foundUser = await UserModel.findById(userId)
        if(!foundUser){
            return Response.json(
                {
                    success: false,
                    message: "User not found"
                },
                {status: 401}
            )
        }else{
            return Response.json(
                {
                    success: true,
                    message: "User found successfully",
                    isAcceptingMessages: foundUser.isAcceptingMessage
                },
                {status: 200}
            )   
        }
    }
    catch(error){
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