import { productController } from "../../controller/ecommerce/product.js";
import { categoryController } from "../../controller/ecommerce/category.js";
import { cartController } from "../../controller/ecommerce/cart.js";
import { checkoutController } from "../../controller/ecommerce/checkout.js";
import { orderController } from "../../controller/ecommerce/order.js";
import { authMiddleware } from "../../middleware/auth.js";
import { mergeCart, mergeWishlist } from "../../controller/ecommerce/mergeApi.js";
import { getWishlist, updateWishlist } from "../../controller/ecommerce/wishlist.js";
import { optionalAuth } from "../../middleware/optionalAuth.js";

export const productRoutes = (app) => {
  app.get("/products", optionalAuth, productController.getProducts);
  app.get("/products/:id", optionalAuth, productController.getProductById);
};

export const categoryRoutes = (app) => {
  app.get("/categories", categoryController.getCategories);
  app.get("/categories/:id", categoryController.getCategoryById);
};

export const cartRoutes = (app) => {
  app.get("/cart", authMiddleware, cartController.getCart);
  app.post("/cart", authMiddleware, cartController.addToCart);
  app.put("/cart/:id", authMiddleware, cartController.updateCartItem);
  app.delete("/cart/:id", authMiddleware, cartController.removeCartItem);
  app.delete("/cart", authMiddleware, cartController.clearCart);
};

export const checkOutRoutes = (app) => {
  app.post("/checkout", authMiddleware, checkoutController.checkout);
};

export const orderRoutes = (app) => {
  app.get("/orders", authMiddleware, orderController.getUserOrders);
  app.get("/orders/:id", authMiddleware, orderController.getOrderById);
};

export const mergeApiRoutes = (app) => {
  app.post("/merge/cart", authMiddleware, mergeCart);
  app.post("/merge/wishlist", authMiddleware, mergeWishlist);
}

export const wishlistRoutes = (app) => {
  app.get("/wishlist", authMiddleware, getWishlist);
  app.post("/wishlist/:productId", authMiddleware, updateWishlist);
}