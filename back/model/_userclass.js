const Sequelize = require("sequelize");

module.exports = (sequelize, ModelHelper) => {
  class userclass extends Sequelize.Model {
    
  }
  userclass.init(
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userid: { type: Sequelize.STRING },
      classid: { type: Sequelize.STRING },
      price: { type: Sequelize.STRING },
      status: {type: Sequelize.INTEGER},
      Startdate: {
        type: Sequelize.STRING,
        defaultValue: Sequelize.fn("getDate"),
      },
      EndDate: {
        type: Sequelize.STRING,
        defaultValue: Sequelize.fn("getDate"),
      },

    },
    {
      sequelize,
      tableName: "userclass",
      modelName: "userclass",
      timestamps: false,
    }
  );
  return userclass;
};
