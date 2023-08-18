import { NextResponse } from "next/server"
import connectDb from "@/../../utils/db";
import PostModel from "@/../../models/Post";

export const GET = async (req, {params}) => {
    const {id} = params;
    try{
        await connectDb();
        const post = await PostModel.findById(id);
        return new NextResponse(JSON.stringify(post), {status: 200});
    }catch(error){
        return new NextResponse("An Error Occured", {status: 500});
    }
}

export const DELETE = async (req, {params}) => {
    const {id} = params;
    try{
        await connectDb();
        const post = await PostModel.findByIdAndDelete(id);
        return new NextResponse("Post has been deleted", {status: 200});
    }catch(error){
        return new NextResponse("An Error Occured", {status: 500});
    }
}