const Sequelize = require("sequelize");

module.exports = (sequelize, ModelHelper) => {
  class news_file extends Sequelize.Model {
    static associate({ news }) {
      this.Assocations = [
        // {
        //   type: "hasMany",
        //   model: news,
        //   as: "news",
        //   foreignKey: "news_type_id",
        // },
      ];
      ModelHelper.SetAssocations(this);
    }
  }
  news_file.init(
    {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: Sequelize.STRING },
      orgname: { type: Sequelize.STRING },
      news_id: { type: Sequelize.STRING },
      path: { type: Sequelize.STRING },
      ext: { type: Sequelize.STRING },
      create_date: { type: Sequelize.DATE },
    },
    {
      sequelize,
      tableName: "news_file",
      modelName: "news_file",
      timestamps: false,
    }
  );
  return news_file;
};
