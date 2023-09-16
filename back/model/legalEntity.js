const Sequelize = require("sequelize");

module.exports = (sequelize, ModelHelper) => {
  class legal_entity extends Sequelize.Model {
    static associate({ users, contact }) {
      this.Assocations = [
        {
          type: "belongsTo",
          model: users,
          as: "users",
          foreignKey: "UserID",
        },
        {
          type: "hasMany",
          model: contact,
          as: "contact",
          foreignKey: "LegalEntityId",
        },
      ];
      ModelHelper.SetAssocations(this);
    }
  }
  legal_entity.init(
    {
      LegalEntityId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      LegalEntityName: { type: Sequelize.STRING },
      LegalEntityRegisterNo: { type: Sequelize.STRING },
      SourceType: { type: Sequelize.INTEGER },
      UserID: { type: Sequelize.INTEGER },
      createdAt: {
        field: "CreatedOn",
        type: Sequelize.STRING,
        defaultValue: Sequelize.fn("getDate"),
      },
      updatedAt: {
        field: "UpdatedOn",
        type: Sequelize.STRING,
        defaultValue: Sequelize.fn("getDate"),
      },
    },
    {
      sequelize,
      tableName: "LegalEntity",
      modelName: "legal_entity",
      timestamps: true,
    }
  );
  return legal_entity;
};
