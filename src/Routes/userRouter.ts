import express, { Request, Response } from "express";
import { userModel } from "../Models/userModel";
import { checkAuth } from "../middleware/auth";
import { isValidObjectId } from "mongoose";

const userRouter = express.Router();

userRouter.get('/:id', checkAuth, async (req: Request, res: Response) => {
    try {
        if (!isValidObjectId(req.params.id)) {
            return res
                .status(404).json({
                    message: "Bad request",
                })
        }
        const user = await userModel.findById(req.params.id);
        if (!user) {
            return res
                .status(404)
                .json({ message: "No user with such id" });
        }
        return res
            .status(200)
            .json({ ...user });
    } catch (err) {
        console.error(err);
        return res
            .status(500).json({
                message: "Unable to get user",
            });
    } finally {
        console.log("Attempt to get user");
    }
});
export default userRouter;