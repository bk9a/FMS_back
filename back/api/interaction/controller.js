const asyncHandler = require("express-async-handler");
const { Op, interaction, users, interaction_type } = require("../../model");

module.exports.list = asyncHandler(async (req, res) => {
  const { page, params } = req.query;
  var par = JSON.parse(params);

  const logged = req.LogedUser;

  const where = {};

  if (par) {
    where[Op.and] = [
      {
        // RelatedUserID: {
        //   [Op.eq]: par.RelatedUserID,
        // },

        OpportunityID: {
          [Op.eq]: par.OpportunityID,
        },
      },
    ];
  }
  const pager = req.pager;
  console.log({ par });
  let incWhere = {};
  // if (logged.RoleID == 2) {
  //   incWhere = {
  //     UserID: {
  //       [Op.eq]: logged.UserID,
  //     },
  //   };
  // } else {
  incWhere = {
    EmpFirstName: {
      [Op.like]: "%" + par["users.EmpFirstName"] + "%",
    },
  };
  //}

  const { rows, count } = await interaction.findAndCountAll({
    where: where,
    include: [
      {
        attributes: ["EmpFirstName"],
        model: users,
        as: "users",
        // where: incWhere,
      },
      {
        attributes: ["Description"],
        model: interaction_type,
        as: "interaction_type",
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
  let RelatedUserID = createData.RelatedUserID;
  console.log({ createData });
  console.log({ re: { ...createData, RelatedUserID } });
  let data = null;
  createData.InteractionTypeID && createData.InteractionTypeID.length > 0
    ? createData.InteractionTypeID.forEach(async (item) => {
        data = await interaction.create({
          ...createData,
          RelatedUserID,
          InteractionTypeID: item.value,
        });
      })
    : null;
  // const data = await interaction.create({ ...createData, RelatedUserID });

  res.status(200).send({
    success: true,
    data: data,
  });
});

module.exports.show = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const data = await interaction.findByPk(id, {});

  res.status(200).send({
    success: true,
    data: data,
  });
});

module.exports.update = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  const data = await interaction.update(updateData, {
    where: {
      InteractionID: id,
    },
  });

  res.status(200).send({
    success: true,
    data: data,
  });
});

module.exports.destroy = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const data = await interaction.destroy({
    where: {
      InteractionID: id,
    },
  });

  res.status(200).send({
    success: true,
    data: data,
  });
});
