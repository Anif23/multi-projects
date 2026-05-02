import bcrypt from "bcrypt";
import { prisma } from "../../config/prisma.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/apiError.js";

export const profileController = {

    getProfile: asyncHandler(async (req, res) => {
        const userId = req.user.id;

        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: {
                cart: {
                    include: {
                        items: true
                    }
                },
                wishlist: {
                    include: {
                        items: true
                    }
                }
            }
        });

        res.json({
            success: true,
            data: {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role,
                createdAt: user.createdAt,

                cartCount: user.cart?.items.length || 0,
                wishlistCount: user.wishlist?.items.length || 0,
            }
        });
    }),

    updateProfile: asyncHandler(async (req, res) => {
        const { username, email } = req.body;

        const updated = await prisma.user.update({
            where: { id: req.user.id },
            data: { username, email }
        });

        res.json({
            success: true,
            message: "Profile updated successfully",
            data: updated
        });
    }),

    changePassword: asyncHandler(async (req, res) => {
        const { oldPassword, newPassword } = req.body;

        const user = await prisma.user.findUnique({
            where: { id: req.user.id }
        });

        const valid = await bcrypt.compare(oldPassword, user.password);

        if (!valid) {
            throw new ApiError(400, "Old password incorrect");
        }

        const hashed = await bcrypt.hash(newPassword, 10);

        await prisma.user.update({
            where: { id: req.user.id },
            data: { password: hashed }
        });

        res.json({
            success: true,
            message: "Password updated successfully"
        });
    }),
};