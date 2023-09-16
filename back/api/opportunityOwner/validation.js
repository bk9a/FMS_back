const validation = require("../../middleware/validation");
const { body, check } = require("express-validator");

module.exports.create = [
  check("UserPercent").notEmpty().withMessage("Талбар хоосон байна"),
  validation,
];
