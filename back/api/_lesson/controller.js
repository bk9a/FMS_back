const asyncHandler = require("express-async-handler");
const { users, classinfo} = require("../../model");

module.exports.list = asyncHandler(async (req, res) => {


  const where = {};


  const pager = req.pager;
  const { rows, count } = await lesson.findAndCountAll({
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
  const data = await lesson.create(createData);

  res.status(200).send({
    success: true,
    data: data,
  });
});

module.exports.show = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const data = await lesson.findByPk(id, {
    include: [
      // {
      //   model: users,
      //   as: "users",
      // },
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
  const data = await lesson.update(updateData, {
    where: {
      id: id,
    },
  });

  res.status(200).send({
    success: true,
    data: data,
  });
});

module.exports.destroy = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const data = await lesson.destroy({
    where: {
      id: id,
    },
  });

  res.status(200).send({
    success: true,
    data: data,
  });
});

module.exports.checklogin = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    // user: req.LogedUser,
  });
});
