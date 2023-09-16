const Sequelize = require("sequelize");

module.exports = (sequelize, ModelHelper) => {
  class opportunity_detail extends Sequelize.Model {
    static associate({ opportunity, product, opportunity_detail_package }) {
      this.Assocations = [
        {
          type: "belongsTo",
          model: opportunity,
          as: "opportunity",
          foreignKey: "OpportunityID",
        },
        {
          type: "belongsTo",
          model: product,
          as: "product",
          foreignKey: "ProductID",
        },
        {
          type: "hasMany",
          model: opportunity_detail_package,
          as: "opportunity_detail_package",
          foreignKey: "OpportunityDetailID",
        },
      ];
      ModelHelper.SetAssocations(this);
    }
  }
  opportunity_detail.init(
    {
      OpportunityDetailID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      // assicotion
      OpportunityID: { type: Sequelize.INTEGER },
      ProductID: { type: Sequelize.INTEGER },
      ProductPackageID: { type: Sequelize.INTEGER },

      EstimatedValue: { type: Sequelize.INTEGER },
      EstimatedPercent: { type: Sequelize.INTEGER },
      TotalQuoteAmount: { type: Sequelize.INTEGER },
      TotalBudgetAmount: { type: Sequelize.INTEGER },
      TotalFeeAmount: { type: Sequelize.INTEGER },
    },
    {
      sequelize,
      tableName: "OpportunityDetail",
      modelName: "opportunity_detail",
      timestamps: false,
    }
  );
  return opportunity_detail;
};
