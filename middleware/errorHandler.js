const errorHandler = (err, _req, res, _next) => {
  let statusCode = err.statusCode || res.statusCode || 500;
  let message = err.message || "Internal Server Error";
  let details;

  if (err.message == "Game not found") {
    statusCode = 404;
    message = "Game not found";
  }

  if (err.message == "Unauthorized") {
    statusCode = 401;
  }

  if (err.message == "Missing Refresh Token") {
    statusCode = 401;
  }

  if (err.name == "JsonWebTokenError") {
    statusCode = 401;
    message = "Invalid access token"
  }

  if (err.name == "TokenExpiredError") {
    statusCode = 401;
    message = "Access token expired"
  }

  if (err.name == "ValidationError") {
    message = "Validation failed";
    statusCode = 400;
    details = Object.keys(err.errors).map((field) => ({
      field,
      message: err.errors[field].message,
    }));
  }

  if (err.name === "CastError") {
    statusCode = 400;
    message = `Invalid value for '${err.path}': ${err.value}`;
  }

  res.status(statusCode).json({
    message: message,
    details,
  });
};

export default errorHandler;
