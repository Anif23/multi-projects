import { adminMiddleware } from "../../middleware/admin.js";
import { authMiddleware } from "../../middleware/auth.js";
import { upload } from "../../middleware/upload.js";
import { productController } from "../../controller/ecommerce/product.js";
import { categoryController } from "../../controller/ecommerce/category.js";
import { orderController } from "../../controller/ecommerce/order.js";

export const adminRoutes = (app) => {

    app.get(
        "/admin/products",
        authMiddleware,
        adminMiddleware,
        productController.getProducts
    );

    app.get(
        "/admin/products/:id",
        authMiddleware,
        adminMiddleware,
        productController.getProductById
    );

    app.post(
        "/admin/products",
        authMiddleware,
        adminMiddleware,
        upload.array("images", 5),
        productController.createProduct
    );

    app.put(
        "/admin/products/:id",
        authMiddleware,
        adminMiddleware,
        upload.array("images", 5),
        productController.updateProduct
    );

    app.delete(
        "/admin/products/:id",
        authMiddleware,
        adminMiddleware,
        productController.deleteProduct
    );

    app.get(
        "/admin/categories",
        authMiddleware,
        adminMiddleware,
        categoryController.getCategories
    );

    app.get(
        "/admin/categories/:id",
        authMiddleware,
        adminMiddleware,
        categoryController.getCategoryById
    );

    app.post(
        "/admin/categories",
        authMiddleware,
        adminMiddleware,
        upload.single("image"),
        categoryController.createCategory
    );

    app.put(
        "/admin/categories/:id",
        authMiddleware,
        adminMiddleware,
        upload.single("image"),
        categoryController.updateCategory
    );

    app.delete(
        "/admin/categories/:id",
        authMiddleware,
        adminMiddleware,
        categoryController.deleteCategory
    );

    app.put(
        "/admin/orders/:id/status",
        authMiddleware,
        adminMiddleware,
        orderController.updateOrderStatus
    );

    app.put(
        "/admin/orders/:id/payment",
        authMiddleware,
        adminMiddleware,
        orderController.updatePaymentStatus
    );

    app.get(
        "/admin/dashboard",
        authMiddleware,
        adminMiddleware,
        async (req, res) => {
            const totalOrders = await prisma.order.count();
            const totalUsers = await prisma.user.count();
            const lowStock = await prisma.product.findMany({
                where: { stock: { lte: 5 } }
            });

            res.json({
                success: true,
                data: {
                    totalOrders,
                    totalUsers,
                    lowStock
                }
            });
        }
    );
};