const asyncHandler = require("express-async-handler");
const { opportunity_close_type } = require("../../model");

module.exports.list = asyncHandler(async (req, res) => {
  var data = await opportunity_close_type.findAll({});

  res.status(200).send({
    success: true,
    data: { data },
  });
});

module.exports.create = asyncHandler(async (req, res) => {
  const createData = req.body;
  const data = await opportunity_close_type.create(createData);

  res.status(200).send({
    success: true,
    data: data,
  });
});

module.exports.show = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const data = await opportunity_close_type.findByPk(id, {});

  res.status(200).send({
    success: true,
    data: data,
  });
});

module.exports.update = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  const data = await opportunity_close_type.update(updateData, {
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
  const data = await opportunity_close_type.destroy({
    where: {
      RoleID: id,
    },
  });

  res.status(200).send({
    success: true,
    data: data,
  });
});
