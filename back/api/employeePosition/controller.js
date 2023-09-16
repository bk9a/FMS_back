const asyncHandler = require("express-async-handler");
const { Op, employee_position } = require("../../model");

module.exports.list = asyncHandler(async (req, res) => {
  const { page, params } = req.query;
  var par = JSON.parse(params);
  const where = {};
  if (par) {
    where[Op.and] = [
      {
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
  const { rows, count } = await employee_position.findAndCountAll({
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
  const data = await employee_position.create(createData);

  res.status(200).send({
    success: true,
    data: data,
  });
});

module.exports.show = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const data = await employee_position.findByPk(id, {});

  res.status(200).send({
    success: true,
    data: data,
  });
});

module.exports.update = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  const data = await employee_position.update(updateData, {
    where: {
      EmployeePositionID: id,
    },
  });

  res.status(200).send({
    success: true,
    data: data,
  });
});

module.exports.destroy = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const data = await employee_position.destroy({
    where: {
      EmployeePositionID: id,
    },
  });

  res.status(200).send({
    success: true,
    data: data,
  });
});
