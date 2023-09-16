const jwt = require("jsonwebtoken");
const asyncHandler = require("./asyncHandle");
const MyError = require("../utils/myError");

exports.protect = asyncHandler(async (req, res, next) => {
  if (!req.headers.authorization) {
    throw new MyError(
      "Энэ үйлдлийг хийхэд таны эрх хүрэхгүй байна. Та эхлээд логин хийнэ үү.",
      200
    );
  }

  const token = req.headers.authorization.split(" ")[1];

  if (!token) {
    throw new MyError("Токен байхгүй байна.", 200);
  }

  const tokenObj = jwt.verify(token, process.env.JWT_PASS);
  console.log(tokenObj);
  req.LogedUser = tokenObj.user;
  next();
});

exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.userRole)) {
      throw new MyError(
        "Таны эрх [" + req.userRole + "] энэ үйлдлийг гүйцэтгэхэд хүрэлцэхгүй!",
        200
      );
    }

    next();
  };
};
