const Sequelize = require("sequelize");

module.exports = (sequelize, ModelHelper) => {
  class product extends Sequelize.Model {
    static associate({ users, product_package, opportunity_detail }) {
      this.Assocations = [
        // {
        //   type: "belongsTo",
        //   model: users,
        //   as: "users",
        //   foreignKey: "CreatedUserID",
        // },
        {
          type: "hasMany",
          model: opportunity_detail,
          as: "opportunity_detail",
          foreignKey: "ProductID",
        },
        {
          type: "hasMany",
          model: product_package,
          as: "product_package",
          foreignKey: "ProductID",
        },
      ];
      ModelHelper.SetAssocations(this);
    }
  }
  product.init(
    {
      ProductID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      ProductCode: { type: Sequelize.STRING },
      ProductName: { type: Sequelize.STRING },
      IsCompany: { type: Sequelize.INTEGER },
      IsPerson: { type: Sequelize.INTEGER },
      ProductPercent: { type: Sequelize.INTEGER },
      // short_content: {
      //   type: Sequelize.VIRTUAL,
      //   get() {
      //     return this.content + "".substring(0, 10);
      //   },
      // },
    },
    {
      sequelize,
      tableName: "product",
      modelName: "product",
      timestamps: false,
    }
  );
  return product;
};
