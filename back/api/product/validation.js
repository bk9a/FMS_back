const validation = require("../../middleware/validation");
const { body, check } = require("express-validator");

module.exports.create = [
  check("ProductName").notEmpty().withMessage("Байгууллагын нэр хоосон байна"),
  check("ProductPercent")
    .notEmpty()
    .withMessage("Хураамжийн хувь хоосон байна"),
  validation,
];
