import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
export const POST = async (req) => {
    try{
        const {credentials} = await req.json() 
        await connDb();
        
        const user = await UserModel.findOne({username: credentials.username});
        if(!user) return NextResponse.json({error: "User dows not exist"},{status: 400});

        const comparePass = await bcrypt.compare(credentials.password, usernameExist.password);
        if(!comparePass) return NextResponse.json({error: "Unable to store password"},{status: 400}); 

        return new NextResponse.json(JSON.stringify(user), { error: "Registered Successfully"}, {status: 201});

    }catch(error){
        return NextResponse("Something went wrong", {status: 500});
    }
}