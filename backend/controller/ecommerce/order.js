import { prisma } from "../../config/prisma.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/apiError.js";

export const orderController = {

    getUserOrders: asyncHandler(async (req, res) => {
        const orders = await prisma.order.findMany({
            where: { userId: req.user.id },
            include: {
                items: {
                    include: {
                        product: {
                            include: {
                                images: true
                            }
                        }
                    }
                },
                payment: true
            },
            orderBy: { createdAt: "desc" }
        });

        res.json({
            success: true,
            count: orders.length,
            data: orders
        });
    }),

    getOrderById: asyncHandler(async (req, res) => {
        const orderId = Number(req.params.id);

        const order = await prisma.order.findUnique({
            where: { id: orderId },
            include: {
                items: {
                    include: {
                        product: {
                            include: { images: true }
                        }
                    }
                },
                payment: true
            }
        });

        if (!order) {
            throw new ApiError(404, "Order not found");
        }

        if (order.userId !== req.user.id) {
            throw new ApiError(403, "Access denied");
        }

        res.json({
            success: true,
            data: order
        });
    }),

    updateOrderStatus: asyncHandler(async (req, res) => {
        const orderId = Number(req.params.id);
        const status = req.body?.status;

        if (!status || status.toString().trim() === "") {
            throw new ApiError(400, "Please give a status to update");
        }

        const validStatus = ["PENDING", "PAID", "SHIPPED", "DELIVERED", "CANCELLED"];

        if (!validStatus.includes(status)) {
            throw new ApiError(400, "Invalid status");
        }

        const order = await prisma.order.findUnique({
            where: { id: orderId }
        });

        if (!order) {
            throw new ApiError(404, "Order not found");
        }

        const allowedTransitions = {
            PENDING: ["PAID", "CANCELLED"],
            PAID: ["SHIPPED", "CANCELLED"],
            SHIPPED: ["DELIVERED"],
            DELIVERED: [],
            CANCELLED: []
        };

        if (!allowedTransitions[order.status].includes(status)) {
            throw new ApiError(
                400,
                `Cannot change status from ${order.status} to ${status}`
            );
        }

        const updated = await prisma.order.update({
            where: { id: orderId },
            data: { status }
        });

        res.json({
            success: true,
            message: "Order status updated",
            data: updated
        });
    }),

    updatePaymentStatus: asyncHandler(async (req, res) => {
        const orderId = Number(req.params.id);
        const { status } = req.body;
        
        if (!status || status.toString().trim() === "") {
            throw new ApiError(400, "Please give a status to update");
        }

        const payment = await prisma.payment.update({
            where: { orderId: Number(orderId) },
            data: { status }
        });

        if (status === "SUCCESS") {
            await prisma.order.update({
                where: { id: Number(orderId) },
                data: { status: "PAID" }
            });
        }

        res.json({
            success: true,
            message: "Payment updated",
            data: payment
        });
    })
};