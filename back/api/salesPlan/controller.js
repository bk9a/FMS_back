const asyncHandler = require("express-async-handler");
const { Op, salesPlan, salesPlanDetail, users } = require("../../model");

module.exports.list = asyncHandler(async (req, res) => {
  const { page, params } = req.query;
  var par = JSON.parse(params);

  const logged = req.LogedUser;

  const where = {};

  if (par) {
    where[Op.and] = [
      {
        SalesPlanYear: {
          [Op.like]: "%" + par.SalesPlanYear + "%",
        },

        PlanAmount: {
          [Op.like]: "%" + par.PlanAmount + "%",
        },
      },
    ];
  }
  const pager = req.pager;
  console.log({ par });
  let incWhere = {};
  if (logged.RoleID == 2) {
    incWhere = {
      UserID: {
        [Op.eq]: logged.UserID,
      },
    };
  } else {
    incWhere = {
      EmpFirstName: {
        [Op.like]: "%" + par["users.EmpFirstName"] + "%",
      },
    };
  }

  const { rows, count } = await salesPlan.findAndCountAll({
    where: where,
    include: [
      {
        attributes: ["EmpFirstName"],
        model: users,
        as: "users",
        where: incWhere,
      },
    ],
    ...pager,
  });

  res.status(200).send({
    success: true,
    data: { data: rows, count: count },
  });
});
module.exports.create = asyncHandler(async (req, res) => {
  const createData = req.body;
  const data = await salesPlan.create(createData);

  if (data && data.SalesPlanID) {
    for (let i = 1; i < 13; i++) {
      const data1 = await salesPlanDetail.create({
        SalesPlanID: data.SalesPlanID,
        Month: i,
        PlanAmount: data.PlanAmount / 12,
      });
    }
  }

  res.status(200).send({
    success: true,
    data: data,
  });
});

module.exports.show = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const data = await salesPlan.findByPk(id, {});

  res.status(200).send({
    success: true,
    data: data,
  });
});

module.exports.update = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  const data = await salesPlan.update(updateData, {
    where: {
      SalesPlanID: id,
    },
  });

  res.status(200).send({
    success: true,
    data: data,
  });
});

module.exports.destroy = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const data = await salesPlan.destroy({
    where: {
      SalesPlanID: id,
    },
  });

  res.status(200).send({
    success: true,
    data: data,
  });
});
