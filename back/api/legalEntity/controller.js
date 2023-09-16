const asyncHandler = require("express-async-handler");
const { users, legal_entity } = require("../../model");

module.exports.list = asyncHandler(async (req, res) => {
  const { filter, page } = req.query;

  const where = {};

  if (filter && filter.searchValue.length > 0) {
    where[Op.or] = [
      {
        LegalEntityName: {
          [Op.like]: "%" + filter.searchValue + "%",
        },
      },
      {
        LegalEntityRegisterNo: {
          [Op.like]: "%" + filter.searchValue + "%",
        },
      },
    ];
  }

  const pager = req.pager;
  const { rows, count } = await legal_entity.findAndCountAll({
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
  const data = await legal_entity.create(createData);

  res.status(200).send({
    success: true,
    data: data,
  });
});

module.exports.show = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const data = await legal_entity.findByPk(id, {
    include: [
      {
        model: users,
        as: "users",
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
  const data = await legal_entity.update(updateData, {
    where: {
      LegalEntityId: id,
    },
  });

  res.status(200).send({
    success: true,
    data: data,
  });
});

module.exports.destroy = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const data = await legal_entity.destroy({
    where: {
      LegalEntityId: id,
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
