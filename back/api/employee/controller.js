const asyncHandler = require("express-async-handler");
const { Op, employee, employee_position } = require("../../model");
const formidable = require("formidable");
const path = require("path");
const fs = require("fs");
const moment = require("moment");
const shortid = require("shortid");
module.exports.list = asyncHandler(async (req, res) => {
  const { page, params } = req.query;
  var par = JSON.parse(params);

  incWhere = {
    ContactID: {
      [Op.like]: "%" + par["ContactID"] + "%",
    },
  };

  const { rows, count } = await employee.findAndCountAll({
    where: incWhere,
    include: [
      {
        model: employee_position,
        as: "employee_position",
        // where: incWhere,
      },
    ],
  });

  res.status(200).send({
    success: true,
    data: { data: rows, count: count },
  });
});
module.exports.create = asyncHandler(async (req, res) => {
  const createData = req.body;
  const data = await employee.create(createData);

  res.status(200).send({
    success: true,
    data: data,
  });
});

module.exports.show = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const data = await employee.findByPk(id, {});

  res.status(200).send({
    success: true,
    data: data,
  });
});

module.exports.update = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  const data = await employee.update(updateData, {
    where: {
      EmployeeID: id,
    },
  });

  res.status(200).send({
    success: true,
    data: data,
  });
});

module.exports.destroy = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const data = await employee.destroy({
    where: {
      EmployeeID: id,
    },
  });

  res.status(200).send({
    success: true,
    data: data,
  });
});
