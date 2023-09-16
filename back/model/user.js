const Sequelize = require("sequelize");

module.exports = (sequelize, ModelHelper) => {
  class users extends Sequelize.Model {
    static associate({ user_role, opportunity, interaction }) {
      this.Assocations = [
        {
          type: "belongsTo",
          model: user_role,
          as: "user_role",
          foreignKey: "RoleID",
        },
        {
          type: "hasMany",
          model: opportunity,
          as: "opportunity",
          foreignKey: "CreatedUserID",
        },
        {
          type: "hasMany",
          model: interaction,
          as: "interaction",
          foreignKey: "RelatedUserID",
        },
      ];
      ModelHelper.SetAssocations(this);
    }
  }
  users.init(
    {
      UserID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      LocationID: { type: Sequelize.INTEGER },
      UserName: { type: Sequelize.TEXT },
      Password: { type: Sequelize.STRING },
      EmpFirstName: { type: Sequelize.STRING },
      EmpLastName: { type: Sequelize.STRING },
      RoleID: { type: Sequelize.INTEGER },
      IsActive: { type: Sequelize.BOOLEAN },

      // short_content: {
      //   type: Sequelize.VIRTUAL,
      //   get() {
      //     return this.content + "".substring(0, 10);
      //   },
      // },
      CreatedDate: {
        type: Sequelize.STRING,
        defaultValue: Sequelize.fn("getDate"),
      },
    },
    {
      sequelize,
      tableName: "users",
      modelName: "users",
      timestamps: false,
    }
  );
  return users;
};
