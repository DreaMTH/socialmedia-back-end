import { body } from "express-validator"

export const loginValidator = [
    body("email", "Invalid email").isEmail(),
    body("password", "Invalid password")
        .isLength({ min: 8, max: 16 }),
]