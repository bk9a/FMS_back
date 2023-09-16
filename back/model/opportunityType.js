const Sequelize = require("sequelize");

module.exports = (sequelize, ModelHelper) => {
  class opportunity_type extends Sequelize.Model {
    static associate({ users, opportunity_lost_reason }) {
      this.Assocations = [
        // {
        //   type: "hasMany",
        //   model: opportunity_lost_reason,
        //   as: "opportunity_lost_reason",
        //   foreignKey: "OpportunityType",
        // },
      ];
      ModelHelper.SetAssocations(this);
    }
  }
  opportunity_type.init(
    {
      OpportunityTypeID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      OppotrunityType: { type: Sequelize.STRING },

      //   type: Sequelize.VIRTUAL,
      //   get() {
      //     return this.content + "".substring(0, 10);
      //   },
      // },
    },
    {
      sequelize,
      tableName: "opportunitytype",
      modelName: "opportunity_type",
      timestamps: false,
    }
  );
  return opportunity_type;
};
