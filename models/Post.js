import mongoose from "mongoose";

const PostSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
    },
    desc: {
        type: String,
        required: [true, "Description is required"],
    },
    content: {
        type: String,
        required: [true, "Content is required"],
    },
    image: {
        type: String,
        required: [true, "Image is required"],
    },
    createdBy:{
        type: String,
        required: true 
    }

}, {timestamps: true });

export default mongoose.models.post || mongoose.model("post", PostSchema);