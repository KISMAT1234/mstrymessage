import { Message } from "@/model/User";
export interface ApiResponse{   // An interface in TypeScript is like a blueprint for an object, specifying what properties the object should have and their types.
    success:boolean;
    message:string;
    isAcceptingMessage?: boolean;
    messages?: Array<Message>

}