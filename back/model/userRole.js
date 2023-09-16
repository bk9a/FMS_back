const Sequelize = require("sequelize");

module.exports = (sequelize, ModelHelper) => {
  class user_role extends Sequelize.Model {
    static associate({ users }) {
      this.Assocations = [
     
      ];
      ModelHelper.SetAssocations(this);
    }
  }
  user_role.init(
    {
      RoleID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      Description: { type: Sequelize.STRING },
      CreatedDate: {
        type: Sequelize.STRING,
        defaultValue: Sequelize.fn("getDate"),
      },
    },
    {
      sequelize,
      tableName: "userrole",
      modelName: "user_role",
      timestamps: false,
    }
  );
  return user_role;
};
