// errorHandler.js
const errorHandler = (err, req, res, next) => {
  // Log the error for debugging
  console.error(err.stack);

  // Determine the status code and message based on the error type
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  // Send error response
  res.status(statusCode).json({
    success: false,
    error: message,
  });
};

export default errorHandler;
