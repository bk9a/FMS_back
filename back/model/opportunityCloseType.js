const Sequelize = require("sequelize");

module.exports = (sequelize, ModelHelper) => {
  class opportunity_close_type extends Sequelize.Model {
    static associate({ users, opportunity }) {
      this.Assocations = [
        {
          type: "hasMany",
          model: opportunity,
          as: "opportunity",
          foreignKey: "OpportunityCloseTypeID",
        },
        // {
        //   type: "belongsTo",
        //   model: users,
        //   as: "users",
        //   foreignKey: "CreatedUserID",
        // },
      ];
      ModelHelper.SetAssocations(this);
    }
  }
  opportunity_close_type.init(
    {
      OpportunityCloseTypeID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      Description: { type: Sequelize.STRING },

      // short_content: {
      //   type: Sequelize.VIRTUAL,
      //   get() {
      //     return this.content + "".substring(0, 10);
      //   },
      // },
    },
    {
      sequelize,
      tableName: "OpportunityCloseType",
      modelName: "opportunity_close_type",
      timestamps: false,
    }
  );
  return opportunity_close_type;
};
