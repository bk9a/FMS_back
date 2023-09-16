const validation = require("../../middleware/validation");
const { body, check } = require("express-validator");

module.exports.create = [
  check("CompanyName").notEmpty().withMessage("Байгууллагын нэр хоосон байна "),
  check("RegisterNo")
    .notEmpty()
    .withMessage("Байгууллагын регистр хоосон байна"),

  validation,
];
