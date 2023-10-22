const Sequelize = require("sequelize");

module.exports = (sequelize, ModelHelper) => {
  class classlesson extends Sequelize.Model {
    static associate({ lesson, classinfo }) {
      this.Assocations = [
        {
          type: "belongsTo",
          model: lesson,
          as: "lesson",
          foreignKey: "lessonid",
        },
        {
          type: "belongsTo",
          model: classinfo,
          as: "classinfo",
          foreignKey: "classid",
        }
      ];
      ModelHelper.SetAssocations(this);
    }
  }
  classlesson.init(
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      classid: { type: Sequelize.STRING },
      lessonid: { type: Sequelize.STRING },

      CreatedDate: {
        type: Sequelize.STRING,
        defaultValue: Sequelize.fn("getDate"),
      },

    },
    {
      sequelize,
      tableName: "classlesson",
      modelName: "classlesson",
      timestamps: false,
    }
  );
  return classlesson;
};
