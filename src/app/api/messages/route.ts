import dbConnect from "@/lib/dbConnect";

export async function POST(request: Request){
    await dbConnect()
    try{

    }
    catch(error){
        console.log("Error adding message",error)
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