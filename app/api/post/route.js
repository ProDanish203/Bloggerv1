import { NextResponse } from "next/server"
import connectDb from "@/utils/db";
import PostModel from "@/models/Post";

export const GET = async (req) => {
    const url = new URL(req.url);
    const username = url.searchParams.get('username');
    try{
        await connectDb();
        const post = await PostModel.find(username && {createdBy: username});
        return new NextResponse(JSON.stringify(post), {status: 200});
    }catch(error){
        return new NextResponse("An Error Occured", {status: 500});
    }
}

export const POST = async (req) => {
    try{
        const {title, desc, img, content, author} = await req.json();

        const post = await PostModel.create({title, desc, image: img, content, createdBy: author});
        return new NextResponse("Post has been published", {status: 201});
    }catch(error){
        return new NextResponse("An Error Occured", {status: 500});
    }
}