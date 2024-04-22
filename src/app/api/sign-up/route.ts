// import dbConnect from "@/lib/dbConnect";
// import UserModel from "@/model/User";
// import bcrypt from "bcryptjs";
// import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";

// export async function POST(request: Request){
//     await dbConnect()
//     try{
//         const {username,email,password} =  await request.json()

//         const existingUserVerifiedByUsername = await  UserModel.findOne({username, isVerified: true})

//         if(existingUserVerifiedByUsername){
//             return Response.json({
//                 success:false,
//                 message:"Username is alreaady taken"
//             },{status:400});
//         }

//         const existingUserByEmail = await UserModel.findOne({email})

//         const verifyCode = Math.floor(10000 + Math.random() * 900000).toString();

//         if(existingUserByEmail){
//              if(existingUserByEmail.isVerified){
//                 return Response.json({
//                     success: false,
//                     message:"User already exists with this email",
//                 },{status:400})
//              }else{
//                 const hashedPassword = await bcrypt.hash(password, 10)
//                 existingUserByEmail.password = hashedPassword;
//                 existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000)
//                 await existingUserByEmail.save();
//              }
//         }else{
//           const hashedPassword = await bcrypt.hash(password,10);

//           const expiryDate = new Date()
//           expiryDate.setHours(expiryDate.getHours() + 1)

//           const newUser = new UserModel({
//             username,
//             email,
//             password:hashedPassword,
//             verifyCode,
//             verifyCodeExpiry: expiryDate;
//             isVerified:false,
//             isAcceptingMessage:true,
//             messages:[]
//           })
//           await newUser.save();
//         }

//        const emailResponse = await sendVerificationEmail(
//             email,
//             username,
//             verifyCode
//         )

//         if(!emailResponse.success){
//             return Response.json({
//                 success: false,
//                 message:emailResponse.message
//             },{status:500})
//         }

//         return Response.json({
//             success:true,
//             message:"User registered successfully, verify your email",
//         })
   
//     }
//     catch(error){
//         console.error('Error registering user', error)
//         return Response.json({
//             success:false,
//             message:"Error registering user"
//         },
//         {
//             status:500
//         })
//     }
// }

import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();
  try {
    const { username, email, password } = await req.body;

    const existingUserVerifiedByUsername = await UserModel.findOne({ username, isVerified: true });

    if (existingUserVerifiedByUsername) {
      return res.status(400).json({ success: false, message: "Username is already taken" });
    }

    const existingUserByEmail = await UserModel.findOne({ email });

    const verifyCode = Math.floor(10000 + Math.random() * 900000).toString();

    if (existingUserByEmail) {
      if (existingUserByEmail.isVerified) {
        return res.status(400).json({ success: false, message: "User already exists with this email" });
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        existingUserByEmail.password = hashedPassword;
        existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000);
        await existingUserByEmail.save();
      }
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);

      const expiryDate = new Date();
      expiryDate.setHours(expiryDate.getHours() + 1);

      const newUser = new UserModel({
        username,
        email,
        password: hashedPassword,
        verifyCode,
        verifyCodeExpiry: expiryDate,
        isVerified: false,
        isAcceptingMessage: true,
        messages: [],
      });
      await newUser.save();
    }

    const emailResponse = await sendVerificationEmail(email, username, verifyCode);

    if (!emailResponse.success) {
      return res.status(500).json({ success: false, message: emailResponse.message });
    }

    return res.status(200).json({ success: true, message: "User registered successfully, verify your email" });

  } catch (error) {
    console.error('Error registering user', error);
    return res.status(500).json({ success: false, message: "Error registering user" });
  }
}
