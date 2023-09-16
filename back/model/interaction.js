const Sequelize = require("sequelize");

module.exports = (sequelize, ModelHelper) => {
  class interaction extends Sequelize.Model {
    static associate({ users, interaction_type, opportunity }) {
      this.Assocations = [
        {
          type: "belongsTo",
          model: interaction_type,
          as: "interaction_type",
          foreignKey: "InteractionTypeID",
        },
        {
          type: "belongsTo",
          model: users,
          as: "users",
          foreignKey: "RelatedUserID",
        },
        {
          type: "belongsTo",
          model: opportunity,
          as: "opportunity",
          foreignKey: "OpportunityID",
        },
      ];
      ModelHelper.SetAssocations(this);
    }
  }
  interaction.init(
    {
      InteractionID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      InteractionTypeID: { type: Sequelize.INTEGER },
      OpportunityID: { type: Sequelize.INTEGER },
      RelatedUserID: { type: Sequelize.INTEGER },
      InteractionDate: { type: Sequelize.DATE },
      Note: { type: Sequelize.TEXT },
      CountPeople: { type: Sequelize.TEXT },

      // short_content: {
      //   type: Sequelize.VIRTUAL,
      //   get() {
      //     return this.content + "".substring(0, 10);
      //   },
      // },
    },
    {
      sequelize,
      tableName: "Interaction",
      modelName: "interaction",
      timestamps: false,
    }
  );
  return interaction;
};
