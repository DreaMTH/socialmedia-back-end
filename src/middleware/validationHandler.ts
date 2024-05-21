import { validationResult } from "express-validator"
import { Request, Response, NextFunction } from "express";


export default (req: Request, res: Response, next: NextFunction) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        return res.status(400)
            .json(validationErrors.array());
    }
    next();
}