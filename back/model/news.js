const Sequelize = require("sequelize");

module.exports = (sequelize, ModelHelper) => {
  class news extends Sequelize.Model {
    static associate({ news_type, news_file }) {
      this.Assocations = [
        {
          type: "belongsTo",
          model: news_type,
          as: "news_type",
          foreignKey: "news_type_id",
        },
        {
          type: "hasMany",
          model: news_file,
          as: "images",
          foreignKey: "news_id",
        },
      ];
      ModelHelper.SetAssocations(this);
    }
  }
  news.init(
    {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      title: { type: Sequelize.STRING },
      content: { type: Sequelize.TEXT },
      date: { type: Sequelize.DATE },
      create_date: { type: Sequelize.DATE },
      news_type_id: { type: Sequelize.INTEGER },
      // short_content: {
      //   type: Sequelize.VIRTUAL,
      //   get() {
      //     return this.content + "".substring(0, 10);
      //   },
      // },
    },
    {
      sequelize,
      tableName: "news",
      modelName: "news",
      timestamps: false,
    }
  );
  return news;
};
