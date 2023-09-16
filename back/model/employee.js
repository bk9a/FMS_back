const Sequelize = require("sequelize");

module.exports = (sequelize, ModelHelper) => {
  class employee extends Sequelize.Model {
    static associate({ contact, employee_position }) {
      this.Assocations = [
        {
          type: "belongsTo",
          model: contact,
          as: "contact",
          foreignKey: "ContactID",
        },
        {
          type: "belongsTo",
          model: employee_position,
          as: "employee_position",
          foreignKey: "EmployeePositionID",
        },
      ];
      ModelHelper.SetAssocations(this);
    }
  }
  employee.init(
    {
      EmployeeID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      ContactID: { type: Sequelize.INTEGER },
      EmployeeName: { type: Sequelize.STRING },
      EmployeePhone: { type: Sequelize.INTEGER },
      Email: { type: Sequelize.STRING },
      EmployeePositionID: { type: Sequelize.INTEGER },
      CreatedDate: {
        type: Sequelize.STRING,
        defaultValue: Sequelize.fn("getDate"),
      },
      // CreatedUserID: { type: Sequelize.INTEGER },
      // short_content: {
      //   type: Sequelize.VIRTUAL,
      //   get() {
      //     return this.content + "".substring(0, 10);
      //   },
      // },
    },
    {
      sequelize,
      tableName: "Employee",
      modelName: "employee",
      timestamps: false,
    }
  );
  return employee;
};
