import type { ErrorRequestHandler } from "express";

export const errorHandler: ErrorRequestHandler = (
  err,
  _req,
  res,
  next,
) => {
  if (res.headersSent) {
    next(err);
    return;
  }

  const statusCode =
    typeof err?.status === "number" &&
    err.status >= 400 &&
    err.status <= 599
      ? err.status
      : 500;

  if (statusCode >= 500) {
    console.error(err);
  }

  const message =
    statusCode === 400
      ? "Invalid request body"
      : statusCode >= 500
        ? "Internal server error"
        : "Request failed";

  res.status(statusCode).json({
    success: false,
    message,
  });
};