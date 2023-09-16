const validation = require("../../middleware/validation");
const { body, check } = require("express-validator");

module.exports.create = [
  check("LegalEntityName").notEmpty().withMessage("Нэр хоосон байна"),
  check("LegalEntityRegisterNo").notEmpty().withMessage("Регистр хоосон байна"),
  // //check("Address").notEmpty().withMessage("Хаяг хоосон байна"),
  // check("ContactNote").notEmpty().withMessage("Тэмдэглэл хоосон байна"),
  // check("Phone").notEmpty().withMessage("Утас хоосон байна"),
  // check("Email").notEmpty().withMessage("Мэйл хоосон байна"),
  // check("URL").notEmpty().withMessage("Веб хуудас хоосон байна"),
  // check("CompanyIndustryID")
  //   .notEmpty()
  //   .withMessage("Байгууллагын үйл ажиллагааны чиглэл хоосон байна"),
  // check("WorkLegalEntityID").notEmpty().withMessage("Регистр хоосон байна"),

  validation,
];
