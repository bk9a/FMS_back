const asyncHandler = require("express-async-handler");
const {
  Op,
  product,
  product_package,
  product_package_detail,
  product_risk_detail,
  product_risk,
} = require("../../model");
const formidable = require("formidable");
const path = require("path");
const fs = require("fs");
const moment = require("moment");
const shortid = require("shortid");

module.exports.list = asyncHandler(async (req, res) => {
  const { page, params } = req.query;
  var par = JSON.parse(params);
  const where = {};
  if (par) {
    where[Op.and] = [
      {
        ProductCode: {
          [Op.like]: "%" + par.ProductCode + "%",
        },
      },
      {
        ProductName: {
          [Op.like]: "%" + par.ProductName + "%",
        },
      },
    ];
  }
  const pager = req.pager;
  const { rows, count } = await product.findAndCountAll({
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
  const data = await product.create(createData);

  res.status(200).send({
    success: true,
    data: data,
  });
});

module.exports.show = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const data = await product.findByPk(id, {
    include: [
      {
        model: product_package,
        as: "product_package",
        include: [
          {
            model: product_package_detail,
            as: "product_package_detail",
            include: [
              {
                model: product_risk_detail,
                as: "product_risk_detail",
                include: [
                  {
                    model: product_risk,
                    as: "product_risk",
                    include: [],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  });

  res.status(200).send({
    success: true,
    data: data,
  });
});

module.exports.update = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  const data = await product.update(updateData, {
    where: {
      ProductID: id,
    },
  });

  res.status(200).send({
    success: true,
    data: data,
  });
});

module.exports.destroy = asyncHandler(async (req, res) => {
  const { id } = req.params;
  console.log({ id });
  const data = await product.destroy({
    where: {
      ProductID: id,
    },
  });

  res.status(200).send({
    success: true,
    data: data,
  });
});
module.exports.selectlist = asyncHandler(async (req, res) => {
  const rows = await product.findAll({});

  res.status(200).send({
    success: true,
    data: { data: rows },
  });
});
