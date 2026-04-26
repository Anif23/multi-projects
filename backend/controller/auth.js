import { prisma } from "../config/prisma.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import bycrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export const authController = {

    register: asyncHandler(async (req, res) => {
        const { username, email, password } = req.body;

        if (!username || !email || !password) throw new ApiError(400, "All fields are required");

        const existingUser = await prisma.user.findFirst({ where: { username } });
        if (existingUser) throw new ApiError(400, "Username already exists");

        const existingEmail = await prisma.user.findUnique({ where: { email } });
        if (existingEmail) throw new ApiError(400, "Email already exists");

        const hashedPassword = await bycrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword
            }
        });

        res.status(201).json({ success: true, user: { id: user.id, username: user.username, email: user.email } });
    }),

    login: asyncHandler(async (req, res) => {
        const { username, password } = req.body;

        if (!username || !password) throw new ApiError(400, "All fields are required");

        const user = await prisma.user.findFirst({ where: { username } });
        if (!user) throw new ApiError(400, "User not found");

        const isMatch = await bycrypt.compare(password, user.password);
        if (!isMatch) throw new ApiError(400, "Password is incorrect");

        const token = jwt.sign(
            {
                id: user.id,
                username: user.username,
                role: user.role
            },
            JWT_SECRET,
            { expiresIn: "3h" }
        );

        res.status(200).json({ success: true, token });
    }),

    logout: asyncHandler(async (req, res) => {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) throw new ApiError(401, "No token provided");
        
        res.status(200).json({ success: true, message: "Logged out successfully" });
    })
}