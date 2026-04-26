import { ApiError } from "../utils/apiError.js";

export const adminMiddleware = (req, res, next) => {
  if (!req.user) {
    throw new ApiError(401, "Unauthorized");
  }

  if (req.user.role !== "ADMIN") {
    throw new ApiError(403, "Admin access only");
  }

  next();
};