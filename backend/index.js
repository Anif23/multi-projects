import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import { todoRoutes } from "./routes/todo.js";
import { authRoutes } from "./routes/auth.js";

import {
  productRoutes,
  cartRoutes,
  categoryRoutes,
  checkOutRoutes,
  orderRoutes,
  mergeApiRoutes,
  wishlistRoutes,
  profileRoutes,
} from "./routes/ecommerce/user.js";

import { adminRoutes } from "./routes/ecommerce/admin.js";
import { errorHandler } from "./utils/ErrorHandler.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/uploads", express.static("uploads"));

authRoutes(app);
adminRoutes(app);
productRoutes(app);
categoryRoutes(app);
cartRoutes(app);
checkOutRoutes(app);
orderRoutes(app);
mergeApiRoutes(app);
wishlistRoutes(app);
profileRoutes(app);
todoRoutes(app);

app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(
    `Server is running on port ${process.env.PORT}`
  );
});