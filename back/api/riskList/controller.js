const asyncHandler = require("express-async-handler");
const {
  product_risk_detail,
  product_risk,
  Op,
  product_package,
  product_package_detail,
  opportunity_detail,
  opportunity_detail_package,
} = require("../../model");

module.exports.list = asyncHandler(async (req, res) => {
  const { page, params } = req.query;
  var par = JSON.parse(params);
  const where = {};
  if (par) {
    where[Op.and] = [
      {
        RiskName: {
          [Op.like]: "%" + par.RiskName + "%",
        },
      },
    ];
  }
  const pager = req.pager;
  const { rows, count } = await product_risk.findAndCountAll({
    where: where,
    include: [],
    ...pager,
  });

  res.status(200).send({
    success: true,
    data: { data: rows, count: count },
  });
});
module.exports.listAll = asyncHandler(async (req, res) => {
  const rows = await product_risk.findAll({});

  res.status(200).send({
    success: true,
    data: { data: rows },
  });
});

module.exports.create = asyncHandler(async (req, res) => {
  const { productRisk, productRiskDetails } = req.body;

  const data = await product_risk.create(productRisk);

  for (let i = 0; i < productRiskDetails.length; i++) {
    const data1 = await product_risk_detail.create({
      ProductRiskID: data.dataValues.RiskID,
      ...productRiskDetails[i],
    });
  }
  res.status(200).send({
    success: true,
    data: data,
  });
});

module.exports.show = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const data = await product_risk.findByPk(id, {
    include: [
      {
        model: product_risk_detail,
        as: "product_risk_detail",
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

  const { productRisk, productRiskDetails } = req.body;

  const data = await product_risk.update(productRisk, {
    where: {
      RiskID: id,
    },
  });

  let addList = [];

  for (let i = 0; i < productRiskDetails.length; i++) {
    if (productRiskDetails[i].ProductRiskDetailID) {
      const tempID = productRiskDetails[i].ProductRiskDetailID;

      addList.push(productRiskDetails[i].ProductRiskDetailID);

      const data = await product_risk_detail.update(productRiskDetails[i], {
        where: {
          ProductRiskDetailID: tempID,
        },
      });
    } else {
      const createData = await product_risk_detail.create({
        ProductRiskID: id,
        ...productRiskDetails[i],
      });

      console.log(createData.ProductRiskDetailID);

      const rows = await product_package.findAll({});

      rows.forEach(async (element) => {
        const data = await product_package_detail.create({
          ProductPackageID: element.ProductPackageID,
          IsActive: 0,
          RiskDetailID: createData.ProductRiskDetailID,
        });

        const rows1 = await opportunity_detail.findAll({
          where: {
            ProductPackageID: element.ProductPackageID,
          },
        });
        rows1.forEach(async (el) => {
          const data111 = await opportunity_detail_package.create({
            OpportunityDetailID: el.OpportunityDetailID,
            ProductPackageDetailID: data.ProductPackageDetailID,
            IsActive: false,
            RiskDetailID: createData.ProductRiskDetailID,
          });
        });
      });
    }
  }

  res.status(200).send({
    success: true,
    data: data,
  });
});

module.exports.destroy = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const data = await product_risk.destroy({
    where: {
      RiskID: id,
    },
  });
  // const dataDetail = await product_risk_detail.destroy({
  //   where: {
  //     ProductRiskID: id,
  //   },
  // });

  res.status(200).send({
    success: true,
    data: data,
  });
});
