const jwt = require("jsonwebtoken");
class Authorization {
  login(user) {
    var token = jwt.sign({ ...user }, process.env.JWT_SECRET, {
      expiresIn: "36000s",
    });
    return token;
  }

  getUserData(token) {
    var UserData = jwt.verify(token, process.env.JWT_SECRET);
    return UserData;
  }
}

module.exports = new Authorization();
