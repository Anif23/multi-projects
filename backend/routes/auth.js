import { authController } from "../controller/auth.js";

export const authRoutes = (app) => {
  app.post("/auth/register", authController.register);
  app.post("/auth/login", authController.login);
  app.post("/auth/refresh", authController.refresh);
  app.post("/auth/logout", authController.logout);
};