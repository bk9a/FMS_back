const e = require("express");
const asyncHandler = require("express-async-handler");
const {
  Op,
  product_package_detail,
  product,
  opportunity_detail,
  opportunity_detail_package,
  product_package_service,
  product_package,
  product_risk_detail,
} = require("../../model");

module.exports.list = asyncHandler(async (req, res) => {
  const { page, params } = req.query;
  var par = JSON.parse(params);

  const logged = req.LogedUser;

  const where = {};

  if (par) {
    where[Op.and] = [
      {
        OpportunityID: {
          [Op.eq]: par.OpportunityID,
        },
      },
    ];
  }
  const pager = req.pager;
  console.log({ par });

  const { rows, count } = await opportunity_detail.findAndCountAll({
    where: where,
    include: [
      {
        model: product,
        as: "product",
      },
      {
        model: opportunity_detail_package,
        as: "opportunity_detail_package",
        include: [
          {
            model: product_package_detail,
            as: "product_package_detail",
          },
        ],
      },
    ],
    ...pager,
  });

  res.status(200).send({
    success: true,
    data: { data: rows, count: count },
  });
});

module.exports.createService = asyncHandler(async (req, res) => {
  const createData = req.body;
  console.log({ createData });
  const where = {};
  where[Op.and] = [
    {
      ProductID: {
        [Op.eq]: createData.ProductID,
      },
      RiskID: {
        [Op.eq]: createData.RiskID,
      },
    },
  ];
  const checker = await product_package_service.findOne({
    where: where,
  });
  let data = null;

  if (checker && checker.ProductPackageServiceID) {
    res.status(200).send({
      success: false,
      data: null,
      error: [{ msg: "Эрсдэл бүртгэлтэй  байна" }],
    });
  } else {
    data = await product_package_service.create({
      ...createData,
      CreatedUser: 1,
    });
    res.status(200).send({
      success: true,
      data: data,
    });
  }
});

module.exports.createPackage = asyncHandler(async (req, res) => {
  const createData = req.body;
  const where = {};
  console.log({ createData });
  where[Op.and] = [
    {
      ProductPackageName: {
        [Op.like]: createData.PackageName,
      },
      ProductID: {
        [Op.eq]: createData.ProductID,
      },
    },
  ];
  const checker = await product_package.findOne({
    where: where,
  });
  let data = null;

  if (checker && checker.ProductPackageID) {
    res.status(200).send({
      success: false,
      data: null,
      error: [{ msg: "Багц бүртгэлтэй  байна" }],
    });
  } else {
    data = await product_package.create({
      ProductPackageName: createData.PackageName,
      ProductID: createData.ProductID,
    });

    if (data && data.ProductPackageID) {
      ProductPackageID = data.ProductPackageID;

      const rd = await product_risk_detail.findAll({
        attributes: ["ProductRiskDetailID"],
      });

      rd.forEach(async (element) => {
        const ppd = await product_package_detail.create({
          ProductPackageID,
          RiskDetailID: element.ProductRiskDetailID,
          IsActive: 1,
        });
      });
      res.status(200).send({
        success: true,
        data: data,
      });
    }
  }
});

module.exports.create = asyncHandler(async (req, res) => {
  const createData = req.body;

  const data = await opportunity_detail.create(createData);

  const opportunity_detail_package_list = createData.product_package_detail;
  if (data.OpportunityDetailID) {
    opportunity_detail_package_list.map(async (item) => {
      await opportunity_detail_package.create({
        ...item,
        OpportunityDetailID: data.OpportunityDetailID,
      });
    });
  }
  res.status(200).send({
    success: true,
    data: data,
  });
});

module.exports.show = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const data = await opportunity_detail.findByPk(id, {});

  res.status(200).send({
    success: true,
    data: data,
  });
});

module.exports.update = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  const data = await opportunity_detail.update(updateData, {
    where: {
      OpportunityDetailID: id,
    },
  });

  const opportunity_detail_package_list = updateData.product_package_detail;
  for (let i = 0; i < opportunity_detail_package_list.length; i++) {
    console.log({ aq: opportunity_detail_package_list[i] });
    await opportunity_detail_package.update(
      opportunity_detail_package_list[i],
      {
        where: {
          OpportunityDetailPackageID:
            opportunity_detail_package_list[i].OpportunityDetailPackageID,
        },
      }
    );
  }
  res.status(200).send({
    success: true,
    data: data,
  });
});

module.exports.updateDetails = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  console.log({ updateData });

  updateData && updateData.product_package
    ? updateData.product_package.forEach(async (item) => {
        item.product_package_detail && item.product_package_detail.length > 0
          ? item.product_package_detail.forEach(async (it) => {
              await product_package_detail.update(it, {
                where: {
                  ProductPackageDetailID: it.ProductPackageDetailID,
                },
              });
            })
          : null;
      })
    : null;

  res.status(200).send({
    success: true,
    data: updateData,
  });
});
module.exports.destroy = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const data = await opportunity_detail.destroy({
    where: {
      OpportunityDetailID: id,
    },
  });

  res.status(200).send({
    success: true,
    data: data,
  });
});
