const Sequelize = require("sequelize");

module.exports = (sequelize, ModelHelper) => {
  class opportunity_owner extends Sequelize.Model {
    static associate({ users, opportunity }) {
      this.Assocations = [
        // {
        //   type: "hasMany",
        //   model: product_risk_detail,
        //   as: "product_risk_detail",
        //   foreignKey: "ProductRiskID",
        // },
        {
          type: "belongsTo",
          model: users,
          as: "createuser",
          foreignKey: "CreatedUserID",
        },
        {
          type: "belongsTo",
          model: opportunity,
          as: "opportunity",
          foreignKey: "OpportunityID",
        },
        {
          type: "belongsTo",
          model: users,
          as: "users",
          foreignKey: "UserID",
        },
      ];
      ModelHelper.SetAssocations(this);
    }
  }
  opportunity_owner.init(
    {
      OpportunityOwnerID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      OpportunityID: { type: Sequelize.STRING },
      UserID: { type: Sequelize.STRING },
      UserPercent: { type: Sequelize.STRING },

      CreatedUserID: { type: Sequelize.INTEGER },
    },
    {
      sequelize,
      tableName: "OpportunityOwner",
      modelName: "opportunity_owner",
      timestamps: false,
    }
  );
  return opportunity_owner;
};
