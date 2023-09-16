const validation = require("../../middleware/validation");
const { body, check } = require("express-validator");

module.exports.create = [
  check("LegalEntityName").notEmpty().withMessage("нэр хоосон байна"),
  check("LegalEntityRegisterNo").notEmpty().withMessage("Регистр хоосон байна"),

  validation,
];
