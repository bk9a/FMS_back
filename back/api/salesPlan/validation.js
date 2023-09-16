const validation = require("../../middleware/validation");
const { body, check } = require("express-validator");

module.exports.create = [
  check("SalesPlanYear").notEmpty().withMessage("Тайлант жил хоосон байна"),
  check("SalesManagerID").notEmpty().withMessage("Менежер хоосон байна"),
  check("PlanAmount").notEmpty().withMessage("Мөнгөн дүн хоосон байна"),
  validation,
];
