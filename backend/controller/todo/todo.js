import { prisma } from "../../config/prisma.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/apiError.js";

export const todoController = {
    getTodos: asyncHandler(async (req, res) => {
        const todos = await prisma.todo.findMany({
            where: {
                userId: req.user.id
            },
            orderBy: {
                createdAt: "desc"
            }
        });

        res.json({
            success: true,
            todos
        });
    }),

    createTodo: asyncHandler(async (req, res) => {
        const { title, completed } = req.body;

        if (!title) throw new ApiError(400, "Title is required");

        const todo = await prisma.todo.create({
            data: {
                title,
                completed: completed ?? false,
                priority: 0,

                user: {
                    connect: { id: req.user.id }
                }
            }
        });

        res.status(201).json({ success: true, todo });
    }),

    updateTodo: asyncHandler(async (req, res) => {
        const { id } = req.params;
        const { title, completed } = req.body;

        if (isNaN(id)) throw new ApiError(400, "Invalid ID");

        try {
            const todo = await prisma.todo.update({
                where: { id: parseInt(id) },
                data: {
                    ...(title !== undefined && { title }),
                    ...(completed !== undefined && { completed })
                }
            });

            res.json({ success: true, todo });

        } catch (error) {
            if (error.code === "P2025") {
                throw new ApiError(404, "Todo not found");
            }
            throw error;
        }
    }),

    deleteTodo: asyncHandler(async (req, res) => {
        const { id } = req.params;

        if (isNaN(id)) throw new ApiError(400, "Invalid ID");

        try {
            await prisma.todo.delete({
                where: { id: parseInt(id) }
            });

            res.json({
                success: true,
                message: "Todo deleted"
            });

        } catch (error) {
            if (error.code === "P2025") {
                throw new ApiError(404, "Todo not found");
            }
            throw error;
        }
    })
};