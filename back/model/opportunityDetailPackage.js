const Sequelize = require("sequelize");

module.exports = (sequelize, ModelHelper) => {
  class opportunity_detail_package extends Sequelize.Model {
    static associate({
      opportunity_detail,

      product_risk_detail,
      product_package_detail,
    }) {
      this.Assocations = [
        {
          type: "belongsTo",
          model: opportunity_detail,
          as: "opportunity_detail",
          foreignKey: "OpportunityDetailID",
        },
        {
          type: "belongsTo",
          model: product_risk_detail,
          as: "product_risk_detail",
          foreignKey: "RiskDetailID",
        },
        {
          type: "belongsTo",
          model: product_package_detail,
          as: "product_package_detail",
          foreignKey: "ProductPackageDetailID",
        },
      ];
      ModelHelper.SetAssocations(this);
    }
  }
  opportunity_detail_package.init(
    {
      OpportunityDetailPackageID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      // assicotion
      OpportunityDetailID: { type: Sequelize.INTEGER },
      ProductPackageDetailID: { type: Sequelize.INTEGER },
      RiskDetailID: { type: Sequelize.INTEGER },
      IsActive: { type: Sequelize.BOOLEAN },
    },
    {
      sequelize,
      tableName: "OpportunityDetailPackage",
      modelName: "opportunity_detail_package",
      timestamps: false,
    }
  );
  return opportunity_detail_package;
};
