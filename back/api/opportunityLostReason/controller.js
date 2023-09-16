const asyncHandler = require("express-async-handler");
const {
  opportunity_lost_reason,
  opportunity_type,
  Op,
} = require("../../model");

module.exports.selectlist = asyncHandler(async (req, res) => {
  const rows = await opportunity_lost_reason.findAll({});

  res.status(200).send({
    success: true,
    data: { data: rows },
  });
});
module.exports.list = asyncHandler(async (req, res) => {
  const { page, params } = req.query;
  var par = JSON.parse(params);
  console.log({ par });
  const where = {};
  if (par) {
    where[Op.and] = [
      {
        OpportunityType: {
          [Op.like]: "%" + par.OpportunityType + "%",
        },
        Description: {
          [Op.like]: "%" + par.Description + "%",
        },
        IsActive: {
          [Op.eq]: par.IsActive,
        },
      },
    ];
  }
  const pager = req.pager;
  const { rows, count } = await opportunity_lost_reason.findAndCountAll({
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
  const data = await opportunity_lost_reason.create(createData);

  res.status(200).send({
    success: true,
    data: data,
  });
});

module.exports.show = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const data = await opportunity_lost_reason.findByPk(id, {
    // include: [
    //   {
    //     model: opportunity_type,
    //     as: "opportunity_type",
    //   },
    // ],
  });

  res.status(200).send({
    success: true,
    data: data,
  });
});

module.exports.update = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  const data = await opportunity_lost_reason.update(updateData, {
    where: {
      OpportunityLostReasonID: id,
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
  const data = await opportunity_lost_reason.destroy({
    where: {
      OpportunityLostReasonID: id,
    },
  });

  res.status(200).send({
    success: true,
    data: data,
  });
});
