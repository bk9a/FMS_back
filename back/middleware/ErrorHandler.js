const ErrorHandler = (err, req, res, next) => {
  var error = { ...err };
  error.message = err.message;

  console.error(err);

  if (error.name === "JsonWebTokenError" && error.message === "invalid token") {
    error.message = "Буруу токен дамжуулсан байна!";
    error.statusCode = 200;
  }

  if (error.code === 11000) {
    error.message = "Энэ талбарын утгыг давхардуулж өгч болохгүй!";
    error.statusCode = 200;
  }

  res.status(err.statusCode || 200).json({
    success: false,
    error,
    message: err.message,
    data: [],
  });
};

module.exports = ErrorHandler;
