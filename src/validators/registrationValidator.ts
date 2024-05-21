import { body } from "express-validator"

export const registrationValidator = [
    body("email", "Incorrect email").isEmail(),
    body("name", "Incorrect name").isString().isLength({ min: 3 }),
    body("password",
        "Password must contain 8-16 characters" +
        ", at least one number, at least one upper-case and 1 lower-case letter"
    ).isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 0,
    }).isLength({ max: 16 }),
]