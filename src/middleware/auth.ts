import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
    const token = (req.headers.authorization || "").replace("/Bearer\s?/", "");
    if (token) {
        try {
            const verify = jwt.verify(token, "token");
            req.headers.userId = (<any>verify).id;
            next();
        } catch (err) {
            console.error(err);
            return res.status(400).json({
                message: "Bad auth",
            })
        }
    } else {
        return res.status(400).json({
            message: "cannot read token",
        });
    }
}