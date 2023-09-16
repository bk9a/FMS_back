const validation = require("../../middleware/validation");
const { body, check } = require("express-validator");

module.exports.create = [
  check("Description").notEmpty().withMessage("Товч утга хоосон байна"),

  validation,
];
