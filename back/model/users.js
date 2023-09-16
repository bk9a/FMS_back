const Sequelize = require("sequelize");

module.exports = (sequelize, ModelHelper) => {
  class users extends Sequelize.Model {
    
  }
  users.init(
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: { type: Sequelize.STRING },
      password: { type: Sequelize.TEXT },
      username: { type: Sequelize.STRING },
      phone: { type: Sequelize.NUMBER },
  
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
