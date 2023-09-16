const Sequelize = require("sequelize");

module.exports = (sequelize, ModelHelper) => {
  class product_package_service extends Sequelize.Model {
    static associate({ product_risk, product }) {
      this.Assocations = [
        {
          type: "belongsTo",
          model: product_risk,
          as: "product_risk",
          foreignKey: "RiskID",
        },
        {
          type: "belongsTo",
          model: product,
          as: "product",
          foreignKey: "ProductID",
        },
      ];
      ModelHelper.SetAssocations(this);
    }
  }
  product_package_service.init(
    {
      ProductPackageServiceID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      ProductID: { type: Sequelize.INTEGER },
      RiskID: { type: Sequelize.INTEGER },

      CreatedUser: { type: Sequelize.INTEGER },

      CreatedDate: {
        type: Sequelize.STRING,
        defaultValue: Sequelize.fn("getDate"),
      },
    },
    {
      sequelize,
      tableName: "ProductPackageService",
      modelName: "product_package_service",
      timestamps: false,
    }
  );
  return product_package_service;
};
