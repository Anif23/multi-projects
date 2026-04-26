import jwt from "jsonwebtoken";

export const optionalAuth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (authHeader?.startsWith("Bearer ")) {
      const token = authHeader.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = decoded;
    }
  } catch (err) {
    // ignore errors → treat as guest
  }

  next();
};