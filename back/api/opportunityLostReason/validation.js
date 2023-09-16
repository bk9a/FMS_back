const validation = require("../../middleware/validation");
const { body, check } = require("express-validator");

module.exports.create = [
  check("OpportunityType").notEmpty().withMessage(" хоосон байна"),
  check("Description").notEmpty().withMessage(" хоосон байна"),
  validation,
];
