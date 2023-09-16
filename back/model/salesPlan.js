const Sequelize = require("sequelize");

module.exports = (sequelize, ModelHelper) => {
  class salesPlan extends Sequelize.Model {
    static associate({ users }) {
      this.Assocations = [
        {
          type: "belongsTo",
          model: users,
          as: "users",
          foreignKey: "SalesManagerID",
        },
      ];
      ModelHelper.SetAssocations(this);
    }
  }
  salesPlan.init(
    {
      SalesPlanID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      SalesPlanYear: { type: Sequelize.INTEGER },
      SalesManagerID: { type: Sequelize.INTEGER },
      PlanAmount: { type: Sequelize.STRING },
      CreatedUserID: { type: Sequelize.INTEGER },

      CreatedDate: {
        type: Sequelize.STRING,
        defaultValue: Sequelize.fn("getDate"),
      },
    },
    {
      sequelize,
      tableName: "SalesPlan",
      modelName: "salesPlan",
      timestamps: false,
    }
  );
  return salesPlan;
};
