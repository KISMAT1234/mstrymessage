import dbConnect from '@/lib/dbConnect';
import UserModel from '@/model/User';
import mongoose from 'mongoose';
import { User } from 'next-auth';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/option';
import { Message } from '@/model/User';

export async function GET(request: Request){
    await dbConnect()
    const session = await getServerSession(authOptions)
    const _user: User = session?.user as User

    if (!session || !_user) {
        return Response.json(
          { 
            success: false, 
           message: 'Not authenticated' 
          },
          { status: 401 }
        );
    }

    const userId = new mongoose.Types.ObjectId(_user._id)  // This creates a new ObjectId instance using the _id property from the _user object. _user._id is assumed to be the unique identifier of a user document in MongoDB. By doing this, you ensure that userId is a proper ObjectId instance.
    console.log(userId,"user id in mongoose types")

    try{
        const user = await UserModel.aggregate([
            {
                $match:{id: userId}
            },
            {
                $unwind: '$messages'
            },
            {
                $sort:{'messages.createdAt': -1}
            },
            {
                $group:{_id:'$_id', messages: {$push:'$messages'}}  //uses the $group operator to group documents by a specified field and performs an aggregation operation on those grouped documents. Let's break down the code:
            }
        ])

        if(!user || user.length === 0){
            return Response.json(
                { 
                  success: false, 
                 message: 'User not found' 
                },
                { status: 401 }
              );
        }

        return Response.json(
            { 
              success: true, 
             messages: user[0].messages 
            },
            { status: 200 }
          );
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

export async function POST(request: Request){
    await dbConnect()
    const {username, content} = await request.json();
    try{
        const user = await UserModel.findOne({username})   
        if(!user){
          return Response.json(
              { 
                success: false, 
               message: 'User not found' 
              },
              { status: 404 }
            );
        }
  
        if(!user.isAcceptingMessage){
          return Response.json(
              { 
                success: true, 
                messages: "User does not accept messages"
              },
              { status: 403 }
          );
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





