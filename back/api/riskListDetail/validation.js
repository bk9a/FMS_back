const validation = require("../../middleware/validation");
const { body, check } = require("express-validator");

module.exports.create = [
  check("ProductRiskID")
    .notEmpty()
    .withMessage("Байгууллагын код хоосон байна"),
  check("RiskDetailName")
    .notEmpty()
    .withMessage("Байгууллагын нэр хоосон байна"),
  check("IsActive").notEmpty().withMessage("Хураамжийн хувь хоосон байна"),
  validation,
];
