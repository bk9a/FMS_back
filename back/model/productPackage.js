const Sequelize = require("sequelize");

module.exports = (sequelize, ModelHelper) => {
  class product_package extends Sequelize.Model {
    static associate({ product, product_package_detail }) {
      this.Assocations = [
        {
          type: "belongsTo",
          model: product,
          as: "product",
          foreignKey: "ProductID",
        },
        {
          type: "hasMany",
          model: product_package_detail,
          as: "product_package_detail",
          foreignKey: "ProductPackageID",
        },
      ];
      ModelHelper.SetAssocations(this);
    }
  }
  product_package.init(
    {
      ProductPackageID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      ProductPackageName: { type: Sequelize.INTEGER },
      ProductID: { type: Sequelize.INTEGER },

      // short_content: {
      //   type: Sequelize.VIRTUAL,
      //   get() {
      //     return this.content + "".substring(0, 10);
      //   },
      // },
    },
    {
      sequelize,
      tableName: "ProductPackage",
      modelName: "product_package",
      timestamps: false,
    }
  );
  return product_package;
};
