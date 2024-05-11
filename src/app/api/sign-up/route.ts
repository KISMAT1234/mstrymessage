import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
import { NextApiRequest, NextApiResponse } from "next";

export  async function POST(req: Request) {
  await dbConnect();
  try {
    const { username, email, password } = await req.json();
    // console.log(username, email, password);

    const existingUserVerifiedByUsername = await UserModel.findOne({ username, isVerified: true });
    // console.log(existingUserVerifiedByUsername,'username' )

    if (existingUserVerifiedByUsername) {
      return Response.json(
        { success: false, message: "Username is already taken" },
        {status:400}
      );
    }

    const existingUserByEmail = await UserModel.findOne({ email });
    // console.log(existingUserByEmail,'email');

    const verifyCode = Math.floor(10000 + Math.random() * 900000).toString();  //Generating random code for user to verify 
    // console.log(verifyCode,'veriFYcODE');

    if (existingUserByEmail) {

      if (existingUserByEmail.isVerified) {
        return Response.json(
          { success: false, message: "User already exists with this email" },
          {status: 400}
          );
      } 
      else {
        const hashedPassword = await bcrypt.hash(password, 10);
        // console.log(hashedPassword,'hashed')

        existingUserByEmail.password = hashedPassword;
        existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000);
        // console.log(existingUserByEmail.verifyCodeExpiry,'verifyCodeExpiry')
        await existingUserByEmail.save();
      }

    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      // console.log(hashedPassword);

      const expiryDate = new Date();
      expiryDate.setHours(expiryDate.getHours() + 1);
      // console.log(expiryDate,'expiryDate');

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
      // console.log(newUser,'new user created')
      await newUser.save();
    }

    const emailResponse = await sendVerificationEmail(email, username, verifyCode);

    if (!emailResponse.success) {
      return Response.json({ success: false, message: emailResponse.message },{status:500});
    }

    return Response.json(
      {
        success: true,
        message: 'User registered successfully. Please verify your account.',
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Error registering user', error);
    return Response.json(
      {
        success: false,
        message: 'Error registering user',
      },
      { status: 500 }
    );
  }
}
