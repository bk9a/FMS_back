const Sequelize = require("sequelize");

module.exports = (sequelize, ModelHelper) => {
  class company_industry extends Sequelize.Model {
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
  company_industry.init(
    {
      CompanyIndustryID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      Description: { type: Sequelize.TEXT },
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
      tableName: "companyindustry",
      modelName: "company_industry",
      timestamps: false,
    }
  );
  return company_industry;
};
