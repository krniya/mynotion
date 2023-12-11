import express, { Request, Response } from "express";
import { body } from "express-validator";
import { User } from "../models/users";
import { BadRequestError } from "../errors/bad-request-error";
import jwt from "jsonwebtoken";
import { validateRequest } from "../middlewares/validate-request";

const router = express.Router();

// * @desc        User Sign up
// * @route       POST /api/users/signup
// * @access      Public
router.post(
    "/api/users/signup",
    [
        body("email").isEmail().withMessage("Email must be valid"),
        body("password")
            .trim()
            .isLength({ min: 8, max: 20 })
            .withMessage("Password must be between 8 and 20 characters"),
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const { email, password } = req.body;
        //* Checking if email is already been used
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new BadRequestError("Email already in use");
        }
        //* User Sign Up
        const user = User.build({ email, password });
        await user.save();

        //* Generate JWT
        const userJwt = jwt.sign(
            {
                id: user.id,
                email: user.email,
            },
            process.env.JWT_KEY!
        );

        //* Storing the JWT on session
        req.session = {
            jwt: userJwt,
        };

        res.status(201).send(user);
    }
);

export { router as signupRouter };
