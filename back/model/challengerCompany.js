const Sequelize = require("sequelize");

module.exports = (sequelize, ModelHelper) => {
  class challenger_company extends Sequelize.Model {
    static associate({ users }) {
      this.Assocations = [
        {
          type: "belongsTo",
          model: users,
          as: "users",
          foreignKey: "CreatedUserID",
        },
      ];
      ModelHelper.SetAssocations(this);
    }
  }
  challenger_company.init(
    {
      ChallengerCompanyID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      CompanyName: { type: Sequelize.STRING },
      RegisterNo: { type: Sequelize.STRING },
      IsActive: { type: Sequelize.BOOLEAN },
      CreatedDate: {
        type: Sequelize.STRING,
        defaultValue: Sequelize.fn("getDate"),
      },
      CreatedUserID: { type: Sequelize.INTEGER },
      // short_content: {
      //   type: Sequelize.VIRTUAL,
      //   get() {
      //     return this.content + "".substring(0, 10);
      //   },
      // },
    },
    {
      sequelize,
      tableName: "challengercompany",
      modelName: "challenger_company",
      timestamps: false,
    }
  );
  return challenger_company;
};
