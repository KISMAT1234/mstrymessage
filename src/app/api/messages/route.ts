import dbConnect from '@/lib/dbConnect';
import UserModel from '@/model/User';
import mongoose from 'mongoose';
import { User } from 'next-auth';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/options';

export async function GET(request: Request){
    await dbConnect()
    const session = await getServerSession(authOptions)
    const _user: User = session?.user as User

    if (!session || !_user) {
        return Response.json(
          { success: false, message: 'Not authenticated' },
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
                $group:{_id:'$_id', messages: {$push:'$messages'}}
            }
        ])
    }
    catch(error){

    }


}


