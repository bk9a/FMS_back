const Sequelize = require("sequelize");

module.exports = (sequelize, ModelHelper) => {
  class product_risk_detail extends Sequelize.Model {
    static associate({ users, product_risk }) {
      this.Assocations = [
        {
          type: "belongsTo",
          model: product_risk,
          as: "product_risk",
          foreignKey: "ProductRiskID",
        },
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
  product_risk_detail.init(
    {
      ProductRiskDetailID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      ProductRiskID: { type: Sequelize.INTEGER },
      RiskDetailCode: { type: Sequelize.STRING },
      RiskDetailName: { type: Sequelize.STRING },
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
      tableName: "productriskdetail",
      modelName: "product_risk_detail",
      timestamps: false,
    }
  );
  return product_risk_detail;
};
