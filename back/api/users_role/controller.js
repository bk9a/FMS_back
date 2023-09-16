const asyncHandler = require("express-async-handler");
const { user_role } = require("../../model");

module.exports.list = asyncHandler(async (req, res) => {
  var data = await user_role.findAll({});

  res.status(200).send({
    success: true,
    data: { data },
  });
});

module.exports.create = asyncHandler(async (req, res) => {
  const createData = req.body;
  const data = await user_role.create(createData);

  res.status(200).send({
    success: true,
    data: data,
  });
});

module.exports.show = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const data = await user_role.findByPk(id, {});

  res.status(200).send({
    success: true,
    data: data,
  });
});

module.exports.update = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  const data = await user_role.update(updateData, {
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
  const data = await user_role.destroy({
    where: {
      RoleID: id,
    },
  });

  res.status(200).send({
    success: true,
    data: data,
  });
});
