const asyncHandler = require("express-async-handler");
const { Op, challenger_company } = require("../../model");
const formidable = require("formidable");
const path = require("path");
const fs = require("fs");
const moment = require("moment");
const shortid = require("shortid");

module.exports.selectlist = asyncHandler(async (req, res) => {
  const rows = await challenger_company.findAll({});

  res.status(200).send({
    success: true,
    data: { data: rows },
  });
});
module.exports.list = asyncHandler(async (req, res) => {
  const { page, params } = req.query;
  var par = JSON.parse(params);
  const where = {};
  if (par) {
    where[Op.and] = [
      {
        CompanyName: {
          [Op.like]: "%" + par.CompanyName + "%",
        },
        RegisterNo: {
          [Op.like]: "%" + par.RegisterNo + "%",
        },
        IsActive: {
          [Op.eq]: par.IsActive,
        },
      },
    ];
  }
  const pager = req.pager;
  const { rows, count } = await challenger_company.findAndCountAll({
    where: where,
    include: [],
    ...pager,
  });

  res.status(200).send({
    success: true,
    data: { data: rows, count: count },
  });
});
module.exports.create = asyncHandler(async (req, res) => {
  const createData = req.body;
  const data = await challenger_company.create(createData);

  res.status(200).send({
    success: true,
    data: data,
  });
});

module.exports.show = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const data = await challenger_company.findByPk(id, {});

  res.status(200).send({
    success: true,
    data: data,
  });
});

module.exports.update = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  const data = await challenger_company.update(updateData, {
    where: {
      ChallengerCompanyID: id,
    },
  });

  res.status(200).send({
    success: true,
    data: data,
  });
});

module.exports.destroy = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const data = await challenger_company.destroy({
    where: {
      ChallengerCompanyID: id,
    },
  });

  res.status(200).send({
    success: true,
    data: data,
  });
});
