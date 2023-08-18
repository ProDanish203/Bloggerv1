import UserModel from "@/../../models/User";
import connDb from "@/../../utils/db";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export const POST = async (req) => {
    try{
        const {username, email, password} = await req.json();
        await connDb();

        // Checking existing email
        const emailExist = await UserModel.findOne({email});
        if(emailExist) return NextResponse.json({error: "Email aleady in use."},{status: 400});

        // Checking existing username
        const usernameExist = await UserModel.findOne({username});
        if(usernameExist) return NextResponse.json({error: "This username is taken, Please try another one."},{status: 400});

        // Hashing the password
        const hashPass = await bcrypt.hash(password, 10);
        if(!hashPass) return NextResponse.json({error: "Unable to store password"},{status: 400}); 

        // Creating the user
        const user = await UserModel.create({ username, email, password: hashPass });
        return NextResponse.json({ error: "Registered Successfully"}, {status: 201});

    }catch(error){
        return NextResponse("Something went wrong", {status: 500});
    }
    
}