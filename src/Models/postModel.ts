import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    createdBy: {
        type: String,
        required: true,
    },
    Post: String,
});
export const postModel = mongoose.models.Posts || mongoose.model('Posts', postSchema);