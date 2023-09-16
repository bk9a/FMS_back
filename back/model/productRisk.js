const Sequelize = require("sequelize");

module.exports = (sequelize, ModelHelper) => {
  class product_risk extends Sequelize.Model {
    static associate({ users, product_risk_detail }) {
      this.Assocations = [
        {
          type: "hasMany",
          model: product_risk_detail,
          as: "product_risk_detail",
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
  product_risk.init(
    {
      RiskID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      RiskCode: { type: Sequelize.STRING },
      RiskName: { type: Sequelize.STRING },
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
      tableName: "productrisk",
      modelName: "product_risk",
      timestamps: false,
    }
  );
  return product_risk;
};
