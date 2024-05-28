import dbConnect from '@/lib/dbConnect';
import UserModel from '@/model/User';
import { User } from 'next-auth';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]/option';

export async function DELETE(request: Request, {params}: {params: {deleteMessageId: string}}){
    const messageId = params.deleteMessageId
    // console.log(messageId, 'message id')
    await dbConnect()
    const session = await getServerSession(authOptions)
    const user: User = session?.user as User
    
    if(!session || !session.user){
        return Response.json({
            success: false,
            message: "Not Authenticated"
        },
        {
            status: 401
        })

    }
    try{
      const updateResult = await UserModel.updateOne({
       _id: user._id
      },
      {
       $pull:{messages:{_id: messageId}} //The $pull operator is used to remove elements from an array that match a specified condition. Here's a breakdown of the code:
      }) 
    //   console.log(updateResult,'result')
      
      if(updateResult.modifiedCount == 0){
        return Response.json({
           success: false,
           message: "Message not found or already deleted"
        },
        {
            status: 404
        })
      }
      return Response.json({
       success: true,
       message: "Message deleted"
      },
      {
       status: 200
      })
    }catch(error){
        console.log("Error in delete message route",error)
      return Response.json({
          success: false,
          message: "Error deleting message"
      },
      {
        status:500
      })
    }
}