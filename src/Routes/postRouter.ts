import express, { Request, Response } from "express";
import { postModel } from "../Models/postModel";
import { checkAuth } from "../middleware/auth";

const postRouter = express.Router();

postRouter.post('/create', checkAuth, async (req: Request, res: Response) => {
    try {
        const { post } = req.body;
        if (!post || (post.length < 1)) {
            return res.status(404).json({
                message: "Invalid post.",
            });
        }
        const doc = new postModel({
            createdBy: req.headers.userId,
            Post: post,
        });
        const newPost = await doc.save();
        if (!newPost) {
            return res.status(400).json({
                message: "Unable to save post",
            })
        }
        return res.status(203).json({ ...newPost });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: "Unable to create post",
        })
    } finally {
        console.log("Attempt to create post");
    }
});
postRouter.get('/', checkAuth, async (req: Request, res: Response) => {
    try {
        const posts = await postModel.find();
        if (!posts) {
            return res.status(500).json({
                message: "Unable to get posts",
            })
        }
        return res.status(200).json(posts);
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: "Unable to get posts",
        })
    } finally {
        console.log("Attempt to get posts");
    }
});
export default postRouter;