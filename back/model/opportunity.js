const Sequelize = require("sequelize");

module.exports = (sequelize, ModelHelper) => {
  class opportunity extends Sequelize.Model {
    static associate({
      users,
      contact,
      challenger_company,
      opportunity_close_type,
      opportunity_detail,
      opportunity_owner,
      interaction,
    }) {
      this.Assocations = [
        {
          type: "belongsTo",
          model: users,
          as: "users",
          foreignKey: "CreatedUserID",
        },
        {
          type: "belongsTo",
          model: contact,
          as: "contact",
          foreignKey: "ContactID",
        },

        {
          type: "belongsTo",
          model: challenger_company,
          as: "challenger_company",
          foreignKey: "ChallengerCompanyID",
        },
        {
          type: "belongsTo",
          model: opportunity_close_type,
          as: "opportunity_close_type",
          foreignKey: "OpportunityCloseTypeID",
        },
        {
          type: "hasMany",
          model: opportunity_detail,
          as: "opportunity_detail",
          foreignKey: "OpportunityID",
        },
        {
          type: "hasMany",
          model: interaction,
          as: "interaction",
          foreignKey: "OpportunityID",
        },
        {
          type: "hasMany",
          model: opportunity_owner,
          as: "opportunity_owner",
          foreignKey: "OpportunityID",
        },
        // {
        //   type: "belongsTo",
        //   model: opportunity,
        //   as: "opportunity",
        //   foreignKey: "OpportunityID",
        // },
      ];
      ModelHelper.SetAssocations(this);
    }
  }
  opportunity.init(
    {
      OpportunityID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      OpportunityCode: { type: Sequelize.INTEGER },
      OpportunityDescription: { type: Sequelize.TEXT },

      // assicotion
      ContactID: { type: Sequelize.INTEGER },
      ChallengerCompanyID: { type: Sequelize.INTEGER },
      CreatedUserID: { type: Sequelize.INTEGER },
      TempDataID: { type: Sequelize.INTEGER },
      OpportunityCloseTypeID: { type: Sequelize.INTEGER },

      OpportunityType: { type: Sequelize.STRING },

      ChancesOfSuccess: { type: Sequelize.INTEGER },
      EstimatedStartDate: { type: Sequelize.DATE },
      EstimatedEndDate: { type: Sequelize.DATE },
      DocumentReceiveDate: { type: Sequelize.DATE },
      ClosedDate: { type: Sequelize.DATE },

      OpportunityStatus: { type: Sequelize.STRING },
      OpportunityCloseDescription: { type: Sequelize.TEXT },
      TenderReasonID: { type: Sequelize.INTEGER },
      SuggestReasonID: { type: Sequelize.INTEGER },

      ChallengerEndCompanyDate: { type: Sequelize.DATE },

      CreatedDate: {
        type: Sequelize.STRING,
        defaultValue: Sequelize.fn("getDate"),
      },

      // short_content: {
      //   type: Sequelize.VIRTUAL,
      //   get() {
      //     return this.content + "".substring(0, 10);
      //   },
      // },
    },
    {
      sequelize,
      tableName: "Opportunity",
      modelName: "opportunity",
      timestamps: false,
    }
  );
  return opportunity;
};
