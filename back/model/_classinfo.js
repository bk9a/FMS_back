const Sequelize = require("sequelize");

module.exports = (sequelize, ModelHelper) => {
  class classinfo extends Sequelize.Model {
    static associate({ users }) {
      this.Assocations = [
        {
          type: "belongsTo",
          model: users,
          as: "users",
          foreignKey: "CreatedUserID",
        }
      ];
      ModelHelper.SetAssocations(this);
    }
  }
  classinfo.init(
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: { type: Sequelize.STRING },
      info: { type: Sequelize.STRING },
      price: { type: Sequelize.STRING },
      CreatedDate: {
        type: Sequelize.STRING,
        defaultValue: Sequelize.fn("getDate"),
      },
      CreatedUserID: { type: Sequelize.INTEGER },
    },
    {
      sequelize,
      tableName: "classinfo",
      modelName: "classinfo",
      timestamps: false,
    }
  );
  return classinfo;
};
