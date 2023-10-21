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
      firstname: { type: Sequelize.STRING },
      lastname: { type: Sequelize.STRING },
      email: { type: Sequelize.STRING },
      sex: { type: Sequelize.NUMBER },
      level: { type: Sequelize.NUMBER },
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
