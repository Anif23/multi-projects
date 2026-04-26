import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) throw new ApiError(401, "Unauthorized");

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  req.user = decoded;

  next();
};