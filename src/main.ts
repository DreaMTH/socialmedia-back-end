import express, { Request, Response } from "express";
import mongoose from "mongoose";
import { userRouter, authRouter, postRouter } from "./Routes/index";

mongoose.connect('connection string')
    .then(() => {
        console.log("Connected to the database");
    }).catch((err) => {
    console.error(err);
});

const app = express();
const port = 3000;
app.use(express.json());
app.use('/user', userRouter);
app.use("/auth", authRouter);
app.use("/posts", postRouter);
app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        message: "Main page",
    })
})
app.listen(port, () => {
    console.log("Server is listening on:", port);
}).on("error", (e) => {
    console.error(e);
});
