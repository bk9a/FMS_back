const asyncHandler = require("express-async-handler");
const {
  Op,
  product_package_service,
  product,
  product_risk,
  product_risk_detail,
} = require("../../model");

module.exports.list = asyncHandler(async (req, res) => {
  const { page, params } = req.query;
  var par = JSON.parse(params);
  const where = {};
  if (par) {
    where[Op.and] = [
      {
        ProductID: {
          [Op.eq]: par.ProductID,
        },
      },
    ];
  }

  const { rows, count } = await product_package_service.findAndCountAll({
    where: where,
    include: [
      {
        model: product,
        as: "product",
      },
      {
        model: product_risk,
        as: "product_risk",
        include: [
          {
            model: product_risk_detail,
            as: "product_risk_detail",
          },
        ],
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
  const data = await product_package_service.create(createData);

  res.status(200).send({
    success: true,
    data: data,
  });
});

module.exports.show = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const data = await product_package_service.findByPk(id, {});

  res.status(200).send({
    success: true,
    data: data,
  });
});

module.exports.update = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  const data = await product_package_service.update(updateData, {
    where: {
      ProductPackageServiceID: id,
    },
  });

  res.status(200).send({
    success: true,
    data: data,
  });
});

module.exports.destroy = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const data = await product_package_service.destroy({
    where: {
      ProductPackageServiceID: id,
    },
  });

  res.status(200).send({
    success: true,
    data: data,
  });
});
