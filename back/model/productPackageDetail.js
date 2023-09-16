const Sequelize = require("sequelize");

module.exports = (sequelize, ModelHelper) => {
  class product_package_detail extends Sequelize.Model {
    static associate({ product_risk_detail, product_package }) {
      this.Assocations = [
        {
          type: "belongsTo",
          model: product_risk_detail,
          as: "product_risk_detail",
          foreignKey: "RiskDetailID",
        },
        {
          type: "belongsTo",
          model: product_package,
          as: "product_package",
          foreignKey: "ProductPackageID",
        },
      ];
      ModelHelper.SetAssocations(this);
    }
  }
  product_package_detail.init(
    {
      ProductPackageDetailID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      ProductPackageID: { type: Sequelize.INTEGER },
      RiskDetailID: { type: Sequelize.INTEGER },
      IsActive: { type: Sequelize.BOOLEAN },
      // short_content: {
      //   type: Sequelize.VIRTUAL,
      //   get() {
      //     return this.content + "".substring(0, 10);
      //   },
      // },
    },
    {
      sequelize,
      tableName: "ProductPackageDetail",
      modelName: "product_package_detail",
      timestamps: false,
    }
  );
  return product_package_detail;
};
