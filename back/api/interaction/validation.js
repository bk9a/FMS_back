const validation = require("../../middleware/validation");
const { body, check } = require("express-validator");

module.exports.create = [
  check("RelatedUserID").notEmpty().withMessage("Менежер хоосон байна"),
  check("InteractionDate")
    .notEmpty()
    .withMessage("Харилцсан огноо хоосон байна"),
  check("CountPeople")
    .notEmpty()
    .withMessage("Хамрагдсан хүний тоо хоосон байна"),
  check("InteractionTypeID")
    .notEmpty()
    .withMessage("Харилцааны төрөл хоосон байна"),

  // InteractionID: {
  //   type: Sequelize.INTEGER,
  //   primaryKey: true,
  //   autoIncrement: true,
  // },
  // InteractionTypeID: { type: Sequelize.INTEGER },
  // OpportunityID: { type: Sequelize.INTEGER },
  // RelatedUserID: { type: Sequelize.INTEGER },
  // InteractionDate: { type: Sequelize.DATE },
  // Note: { type: Sequelize.TEXT },
  // CountPeople: { type: Sequelize.TEXT },
  validation,
];
