const Sequelize = require("sequelize");

module.exports = (sequelize, ModelHelper) => {
  class salesPlanDetail extends Sequelize.Model {
    static associate({ salesPlan }) {
      this.Assocations = [
        {
          type: "belongsTo",
          model: salesPlan,
          as: "salesPlan",
          foreignKey: "SalesPlanID",
        },
      ];
      ModelHelper.SetAssocations(this);
    }
  }
  salesPlanDetail.init(
    {
      SalesPlanDetailID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      SalesPlanID: { type: Sequelize.INTEGER },
      Month: { type: Sequelize.INTEGER },
      PlanAmount: { type: Sequelize.STRING },
    },
    {
      sequelize,
      tableName: "salesPlanDetail",
      modelName: "salesPlanDetail",
      timestamps: false,
    }
  );
  return salesPlanDetail;
};
