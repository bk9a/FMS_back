const { request } = require("express");
const asyncHandler = require("express-async-handler");
var BaseController = require("./BaseController");
const AuthHelper = require("../helper/AuthHelper");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

class UserController extends BaseController {
  constructor() {
    super();
  }

  CheckLogin = asyncHandler(async (req, res) => {
    res.status(200).send({
      Success: true,
      Data: { LogedUser: req.LogedUser },
    });
  });

  Login = asyncHandler(async (req, res) => {
    var { UserName, Password } = req.body;

    var data = await this.Models.Users.findOne({
      where: { UserName: UserName },
    });
    if (!data) {
      throw new this.MyError("Хэрэглэгч олдсонгүй ", 200);
    }
    var ok = await bcrypt.compare(Password, data.Password);
    if (!ok) {
      throw new this.MyError("Имэйл болон нууц үгээ зөв оруулна уу", 200);
    }
    delete data.Password;
    var Token = AuthHelper.login({
      UserName: "batuna",
      Id: 1,
      "https://hasura.io/jwt/claims": {
        "x-hasura-allowed-roles": ["editor", "user", "mod"],
        "x-hasura-default-role": "user",
        "x-hasura-user-id": "1234567890",
        "x-hasura-org-id": "123",
        "x-hasura-custom": "custom-value",
      },
    });
    res.status(200).send({
      Token: Token,
      Success: true,
      LogedUser: data,
      // Data: { Token, LogedUser: data },
    });
  });

  Register = asyncHandler(async (req, res) => {
    var { UserName, Password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(Password, salt);
    var data = await this.Models.Users.create({
      UserName: UserName,
      Password: password,
    });
    res.status(200).send({
      Success: true,
      Data: data,
    });
  });
}

module.exports = new UserController();
