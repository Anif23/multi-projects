import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { todoRoutes } from './routes/todo.js';
import { authRoutes } from './routes/auth.js';
import { productRoutes, cartRoutes, categoryRoutes, checkOutRoutes, orderRoutes, mergeApiRoutes, wishlistRoutes } from './routes/ecommerce/user.js';
import { adminRoutes } from './routes/ecommerce/admin.js';
import { errorHandler } from './utils/ErrorHandler.js';

const app = express();
app.use(express.json());

dotenv.config();

const corsOptions = {
    origin: process.env.FRONTEND_URL || '*'
};

app.use(cors(corsOptions));

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
todoRoutes(app);

app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});