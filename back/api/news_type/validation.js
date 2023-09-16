const validation = require("../../middleware/validation");
const { body, check } = require("express-validator");

module.exports.create = [
  check("name")
    .notEmpty()
    .withMessage("Нэр хоосон байна")
    .isLength({ min: 3, max: 20 })
    .withMessage("3 с 20 урттай байна"),
  validation,
];
