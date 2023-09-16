const asyncHandler = require("express-async-handler");
const { opportunity_type } = require("../../model");
const formidable = require("formidable");
const path = require("path");
const fs = require("fs");
const moment = require("moment");
const shortid = require("shortid");

module.exports.list = asyncHandler(async (req, res) => {
  var data = await opportunity_type.findAll({});

  res.status(200).send({
    success: true,
    data: { data },
  });
});

module.exports.create = asyncHandler(async (req, res) => {
  const createData = req.body;
  const data = await opportunity_type.create(createData);

  res.status(200).send({
    success: true,
    data: data,
  });
});

module.exports.show = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const data = await opportunity_type.findByPk(id, {});

  res.status(200).send({
    success: true,
    data: data,
  });
});

module.exports.update = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  const data = await opportunity_type.update(updateData, {
    where: {
      RoleID: id,
    },
  });

  res.status(200).send({
    success: true,
    data: data,
  });
});

module.exports.destroy = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const data = await opportunity_type.destroy({
    where: {
      RoleID: id,
    },
  });

  res.status(200).send({
    success: true,
    data: data,
  });
});
