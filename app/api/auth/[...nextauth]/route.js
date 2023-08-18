import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import connDb from "@/utils/db";
import UserModel from "@/models/User";
import bcrypt from "bcrypt";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      id: 'credentials',
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", },
        password: {  label: "Password", type: "password" }
      },
      async authorize(credentials){
        await connDb();
        try{
          const res = await fetch('http://localhost:3000/api/auth/login', {
            method: "POST",
            body: JSON.stringify(credentials)
          })
          
          console.log(res);
          return res.json();
          // const user = await UserModel.findOne({username: credentials.username}) 
          // if(!user) throw new Error("User not found"); 
            // Check Password
          // const checkPass = await bcrypt.compare(credentials.password, user.password);
          // if(!checkPass){
          //   throw new Error("Invalid Credentials");
          // }else{
          //   return user;
          // }
        }catch(error){
          throw new Error(error);
        }
      }
    })
  ],
  pages: {
    error: "/dashboard/login"
  }
})

export { handler as GET, handler as POST}
