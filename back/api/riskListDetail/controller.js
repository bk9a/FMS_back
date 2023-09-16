const asyncHandler = require("express-async-handler");
const {
  Op,
  product_risk_detail,
  product_package_detail,
} = require("../../model");
const formidable = require("formidable");
const path = require("path");
const fs = require("fs");
const moment = require("moment");
const shortid = require("shortid");

module.exports.list = asyncHandler(async (req, res) => {
  const { filter, page } = req.query;

  const where = {};

  if (filter && filter.searchValue.length > 0) {
    where[Op.or] = [
      {
        RiskDetailName: {
          [Op.like]: "%" + filter.searchValue + "%",
        },
      },
    ];
  }

  const pager = req.pager;
  const { rows, count } = await product_risk_detail.findAndCountAll({
    where: where,

    ...pager,
  });

  res.status(200).send({
    success: true,
    data: { data: rows, count: count },
  });
});

module.exports.create = asyncHandler(async (req, res) => {
  const createData = req.body;
  const data = await product_risk_detail.create(createData);

  res.status(200).send({
    success: true,
    data: data,
  });
});

module.exports.show = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const data = await product_risk_detail.findByPk(id, {});

  res.status(200).send({
    success: true,
    data: data,
  });
});

module.exports.update = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  const data = await product_risk_detail.update(updateData, {
    where: {
      ProductRiskDetailID: id,
    },
  });

  res.status(200).send({
    success: true,
    data: data,
  });
});

module.exports.destroy = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const data1 = await product_package_detail.destroy({
    where: {
      RiskDetailID: id,
    },
  });

  const data = await product_risk_detail.destroy({
    where: {
      ProductRiskDetailID: id,
    },
  });

  res.status(200).send({
    success: true,
    data: data,
  });
});
