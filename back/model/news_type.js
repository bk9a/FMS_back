const Sequelize = require("sequelize");

module.exports = (sequelize, ModelHelper) => {
  class news_type extends Sequelize.Model {
    static associate({ news }) {
      this.Assocations = [
        {
          type: "hasMany",
          model: news,
          as: "news",
          foreignKey: "news_type_id",
        },
      ];
      ModelHelper.SetAssocations(this);
    }
  }
  news_type.init(
    {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: Sequelize.STRING },
    },
    {
      sequelize,
      tableName: "news_type",
      modelName: "news_type",
      timestamps: false,
    }
  );
  return news_type;
};
