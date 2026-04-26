import { ZodError } from "zod";

export const errorHandler = (err, req, res, next) => {

  if (err instanceof ZodError) {
    const errors = {};

    err.issues.forEach((e) => {  
      errors[e.path[0]] = e.message;
    });

    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors
    });
  }

  if (err.statusCode) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message
    });
  }

  return res.status(500).json({
    success: false,
    message: "Internal Server Error"
  });
};