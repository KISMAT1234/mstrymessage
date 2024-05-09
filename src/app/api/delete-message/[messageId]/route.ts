import dbConnect from "@/lib/dbConnect";
import { getServerSession, User} from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/option";
import UserModel from "@/model/User";
// import { authOptions } from "../../auth/[...nextauth]/options";
// import dbConnect from "@/lib/db/connect"

export async function DELETE(request: Request, {params}: {params: {messageid: string}}){
    const messageId = params.messageid
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