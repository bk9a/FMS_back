const Sequelize = require("sequelize");

module.exports = (sequelize, ModelHelper) => {
  class contact extends Sequelize.Model {
    static associate({ users, company_industry, legal_entity, opportunity }) {
      this.Assocations = [
        {
          type: "belongsTo",
          model: users,
          as: "users",
          foreignKey: "UserID",
        },
        {
          type: "belongsTo",
          model: company_industry,
          as: "company_industry",
          foreignKey: "CompanyIndustryID",
        },
        {
          type: "belongsTo",
          model: legal_entity,
          as: "legal_entity",
          foreignKey: "LegalEntityID",
        },
        {
          type: "hasMany",
          model: opportunity,
          as: "opportunity",
          foreignKey: "ContactID",
        },
      ];
      ModelHelper.SetAssocations(this);
    }
  }
  contact.init(
    {
      ContactID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      Type: { type: Sequelize.STRING },
      ContactName: { type: Sequelize.STRING },
      LegalEntityID: { type: Sequelize.INTEGER },
      WorkLegalEntityID: { type: Sequelize.INTEGER },
      Phone: { type: Sequelize.STRING },
      Email: { type: Sequelize.STRING },
      URL: { type: Sequelize.STRING },
      Address: { type: Sequelize.TEXT },
      ContactNote: { type: Sequelize.TEXT },
      UserID: { type: Sequelize.INTEGER },
      CompanyIndustryID: { type: Sequelize.INTEGER },
      CreatedDate: {
        type: Sequelize.STRING,
        defaultValue: Sequelize.fn("getDate"),
      },
      // CreatedUserID: { type: Sequelize.INTEGER },
      // short_content: {
      //   type: Sequelize.VIRTUAL,
      //   get() {
      //     return this.content + "".substring(0, 10);
      //   },
      // },
    },
    {
      sequelize,
      tableName: "Contact",
      modelName: "contact",
      timestamps: false,
    }
  );
  return contact;
};
