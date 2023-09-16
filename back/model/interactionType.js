const Sequelize = require("sequelize");

module.exports = (sequelize, ModelHelper) => {
  class interaction_type extends Sequelize.Model {
    static associate({ users }) {
      this.Assocations = [
        {
          type: "belongsTo",
          model: users,
          as: "users",
          foreignKey: "CreatedUserID",
        },
      ];
      ModelHelper.SetAssocations(this);
    }
  }
  interaction_type.init(
    {
      InteractionTypeID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      Description: { type: Sequelize.TEXT },
      IsActive: { type: Sequelize.BOOLEAN },
      CreatedDate: {
        type: Sequelize.STRING,
        defaultValue: Sequelize.fn("getDate"),
      },
      CreatedUserID: { type: Sequelize.INTEGER },
      // short_content: {
      //   type: Sequelize.VIRTUAL,
      //   get() {
      //     return this.content + "".substring(0, 10);
      //   },
      // },
    },
    {
      sequelize,
      tableName: "interactiontype",
      modelName: "interaction_type",
      timestamps: false,
    }
  );
  return interaction_type;
};
