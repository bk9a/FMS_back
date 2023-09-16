const Sequelize = require("sequelize");

module.exports = (sequelize, ModelHelper) => {
  class opportunity_lost_reason extends Sequelize.Model {
    static associate({ users, opportunity_type }) {
      this.Assocations = [
        // {
        //   type: "belongsTo",
        //   model: opportunity_type,
        //   as: "opportunity_type",
        //   foreignKey: "OpportunityType",
        // },
        {
          type: "belongsTo",
          model: users,
          as: "users",
          foreignKey: "CreatedUser",
        },
      ];
      ModelHelper.SetAssocations(this);
    }
  }
  opportunity_lost_reason.init(
    {
      OpportunityLostReasonID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      OpportunityType: { type: Sequelize.STRING },
      Description: { type: Sequelize.STRING },
      IsActive: { type: Sequelize.BOOLEAN },
      CreatedDate: {
        type: Sequelize.STRING,
        defaultValue: Sequelize.fn("getDate"),
      },
      CreatedUser: { type: Sequelize.INTEGER },
      // short_content: {
      //   type: Sequelize.VIRTUAL,
      //   get() {
      //     return this.content + "".substring(0, 10);
      //   },
      // },
    },
    {
      sequelize,
      tableName: "opportunitylostreason",
      modelName: "opportunity_lost_reason",
      timestamps: false,
    }
  );
  return opportunity_lost_reason;
};
