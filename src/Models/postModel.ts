import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        Post: String,
    },
    {
        timestamps: true,
    });
export const postModel = mongoose.models.Posts || mongoose.model('Posts', postSchema);