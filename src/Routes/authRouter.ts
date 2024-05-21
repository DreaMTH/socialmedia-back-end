import express, { Request, Response } from 'express';
import bcrypt from "bcrypt";
import { userModel } from "../Models/userModel";
import jwt from "jsonwebtoken";
import { loginValidator, registrationValidator } from "../validators";
import handleValidation from "../middleware/validationHandler";

const authRouter = express.Router();
authRouter
    .post('/registration', registrationValidator,
        handleValidation, async (req: Request, res: Response) => {
            try {
                const { name, email, password } = req.body;
                const salt = await bcrypt.genSalt(10);
                const passwordHash = await bcrypt.hash(password, salt);
                const doc = new userModel({
                    name,
                    email,
                    hashedPassword: passwordHash
                });
                const user = await doc.save();
                const token = jwt.sign({ id: user._id }
                    , "token"
                    , {
                        expiresIn: "30d",
                    });
                res.json({
                    token
                });
            } catch (err: any) {
                if (err.code === 11000) {
                    return res.status(400).json({
                        message: "User with this email is already exists",
                    });
                }
                console.error(err);
                return res.status(500).send({
                    message: "Server error"
                });
            } finally {
                console.log('Registration attempt');
            }
        });
authRouter
    .post('/login', loginValidator,
        handleValidation, async (req: Request, res: Response) => {
            try {
                const { email, password } = req.body;
                const user = await userModel.findOne({ email: email });
                if (!user) {
                    return res.status(400).json({
                        message: "No user with such email",
                    });
                }
                const verifyPassword = bcrypt.compare(
                    password,
                    user._doc.hashedPassword,
                );
                if (!verifyPassword) {
                    return res.status(403).json({
                        message: "Incorrect login or password",
                    });
                }
                const token = jwt.sign({ id: user._id }
                    , "token"
                    , { expiresIn: '30d' });
                res.json({ token });
            } catch (err) {
                console.error(err);
                return res.status(500).json({
                    message: "Unable to login",
                });
            } finally {
                console.log("Attempt to login");
            }
        });
export default authRouter;