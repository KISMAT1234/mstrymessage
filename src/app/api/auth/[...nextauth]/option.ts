import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
// import jwt from "@/lib/jwt"

export const authOptions: NextAuthOptions = {
    providers:[
        CredentialsProvider({  //The Credentials provider allows you to handle signing in with arbitrary credentials, such as a username and password, domain, or two factor authentication or hardware device (e.g. YubiKey U2F / FIDO).
            id: "credentials",
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text"},
                password: { label: "Password", type: "password" }
              },

              async authorize(credentials:any):Promise<any>{  //It checks if the user exists and if their password is correct using bcrypt for password comparison.
                await dbConnect()
                try{
                  console.log(credentials,'credentials of email and password')
                  const user =  await UserModel.findOne({
                     $or:[
                        {email: credentials.identifier},
                        {username: credentials.identifier}
                     ]
                   })
                   console.log(user,'userdata in authorize')
                   
                   if(!user){
                    throw new Error('No user found with this email')
                   }

                   if(!user.isVerified){
                    throw new Error('Please verify your account before login')
                   }

                  const isPasswordCorrect =  await bcrypt.compare(credentials.password, user.password)

                   if(isPasswordCorrect){
                    return user
                   }else{
                    throw new Error('Incorrect Password')
                   }

                }catch(err:any){
                    throw new Error(err);
                }

              }
        })
    ],
    callbacks:{
      async jwt({ token, user}) {  // jwt callback modifies the JSON Web Token (JWT) to include user-specific data like user ID, verification status, messaging preferences, and username.
        if(user){
         token._id = user._id?.toString()
         token.isVerified = user.isVerified
         token.isAcceptingMessages = user.isAcceptingMessages;
         token.username = user.username
      }
      return token
    },
      async session({ session,token }) {  //session callback updates the session object with user data from the JWT token.
        if(token){
          session.user._id = token._id
          session.user.isVerified = token.isVerified
          session.user.isAcceptingMessages = token.isAcceptingMessages
          session.user.username = token.username
        }
        return session;
      },
    },
 
    session:{
      strategy:"jwt"
    },
    secret:process.env.NEXTAUTH_SECRET,
    pages:{
      signIn: '/sign-in'
    },

}