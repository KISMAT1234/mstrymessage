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


}

export async function GET(request: Request){
    await dbConnect()
    try{

    }
    catch(error){
        console.log("Error adding message",error)
    }
}