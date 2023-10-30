const validation = require("../../middleware/validation");
const { body, check } = require("express-validator");

module.exports.create = [
  // check("UserName").notEmpty().withMessage("Нэвтрэх нэр хоосон байна"),
  // check("EmpFirstName").notEmpty().withMessage("Хэрэглэгчийн нэр хоосон байна"),
  // check("RoleID").notEmpty().withMessage("Хэрэглэгчийн эрх хоосон байна"),
  // check("EmpLastName").notEmpty().withMessage("Хэрэглэгчийн овог хоосон байна"),
  // check("Password").notEmpty().withMessage("Нууц үг хоосон байна"),
  validation,
];
