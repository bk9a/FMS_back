const validation = require("../../middleware/validation");
const { body, check } = require("express-validator");

module.exports.create = [
  check("productRisk.RiskName")
    .notEmpty()
    .withMessage("Эрсдэлийн нэр хоосон байна "),

  validation,
];
