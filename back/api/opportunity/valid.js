const validation = require("../../middleware/validation");
const { body, check } = require("express-validator");

module.exports.create = [
  // check("OpportunityStatus")
  //   .notEmpty()
  //   .withMessage("Харилцагчийн нэр хоосон байна"),
  check("OpportunityType")
    .notEmpty()
    .withMessage("Боломжийн төрөл хоосон байна"),
  check("ChancesOfSuccess")
    .notEmpty()
    .withMessage("Амжилтын хувь хоосон байна"),

  check("EstimatedStartDate").notEmpty().withMessage("Эхлэх огноо оруулна уу"),
  check("EstimatedEndDate")
    .notEmpty()
    .withMessage("Дуусах огноо эхлэх огноо оруулна уу"),
  check("contact.legal_entity.LegalEntityRegisterNo")
    .notEmpty()
    .withMessage("Талбар хоосон байна"),
  check("contact.ContactName").notEmpty().withMessage("Талбар хоосон байна"),

  // check("CreatedUserID").notEmpty().withMessage("Талбар хоосон байна"),
  // check("CreatedDate").notEmpty().withMessage("Талбар хоосон байна"),

  validation,
];
