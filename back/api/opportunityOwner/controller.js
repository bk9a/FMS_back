const asyncHandler = require("express-async-handler");
const { Op, opportunity_owner, users } = require("../../model");

module.exports.list = asyncHandler(async (req, res) => {
  const { page, params } = req.query;
  var par = JSON.parse(params);

  const logged = req.LogedUser;

  const where = {};

  if (par) {
    where[Op.and] = [
      {
        CreatedUserID: {
          [Op.eq]: par.CreatedUserID,
        },

        OpportunityID: {
          [Op.eq]: par.OpportunityID,
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

  const { rows, count } = await opportunity_owner.findAndCountAll({
    where: where,
    include: [
      {
        attributes: ["EmpFirstName"],
        model: users,
        as: "users",
        // where: incWhere,
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

  let oppPer = createData.UserPercent;
  const where = {};
  where[Op.and] = [
    {
      UserID: {
        [Op.eq]: req.LogedUser.UserID,
      },

      OpportunityID: {
        [Op.eq]: createData.OpportunityID,
      },
    },
  ];
  const where1 = {};
  where1[Op.and] = [
    {
      UserID: {
        [Op.eq]: createData.UserID,
      },

      OpportunityID: {
        [Op.eq]: createData.OpportunityID,
      },
    },
  ];
  const perData = await opportunity_owner.findOne({
    where: where,
  });
  const newPerData = await opportunity_owner.findOne({
    where: where1,
  });

  if (newPerData === null) {
    if (perData.UserPercent - oppPer > 0) {
      let UserPercent = perData.UserPercent - oppPer;
      const data = await opportunity_owner.create(createData);
      where1[Op.and] = [
        {
          UserID: {
            [Op.eq]: req.LogedUser.UserID,
          },

          OpportunityID: {
            [Op.eq]: createData.OpportunityID,
          },
        },
      ];
      const data11 = await opportunity_owner.update(
        { UserPercent },
        {
          where: where1,
        }
      );

      res.status(200).send({
        success: true,
        data: data,
      });
    } else {
      res.status(200).send({
        success: false,
        data: null,
        error: [{ msg: "Оролцооны хувь хангалтгүй байна" }],
      });
    }
  } else {
    res.status(200).send({
      success: false,
      data: null,
      error: [{ msg: "Менежер бүртгэлтэй байна" }],
    });
  }

  // const data = await opportunity_owner.create(createData);
});

module.exports.show = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const data = await opportunity_owner.findByPk(id, {});

  res.status(200).send({
    success: true,
    data: data,
  });
});

module.exports.update = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  const where = {};
  where[Op.and] = [
    {
      UserID: {
        [Op.eq]: req.LogedUser.UserID,
      },

      OpportunityID: {
        [Op.eq]: updateData.OpportunityID,
      },
    },
  ];
  const updata = await opportunity_owner.findOne({
    where: {
      OpportunityOwnerID: id,
    },
  });

  if (updata.UserID === updata.CreatedUserID) {
    res.status(200).send({
      success: false,
      data: null,
      error: [{ msg: "Үндсэн менежрийг засварлах боломжгүй!!!" }],
    });
  } else {
    const perData = await opportunity_owner.findOne({
      where: where,
    });

    let newPers =
      perData.UserPercent + updata.UserPercent - updateData.UserPercent;

    const data11 = await opportunity_owner.update(
      { UserPercent: newPers },
      {
        where: {
          UserID: req.LogedUser.UserID,
        },
      }
    );
    const data = await opportunity_owner.update(updateData, {
      where: {
        OpportunityOwnerID: id,
      },
    });

    res.status(200).send({
      success: true,
      data: data,
    });
  }
});

module.exports.destroy = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const where = {};
  const deletedata = await opportunity_owner.findByPk(id, {});
  console.log({ deletedata });
  if (deletedata.UserID === deletedata.CreatedUserID) {
    res.status(200).send({
      success: false,
      data: null,
      error: [{ msg: "Үндсэн менежрийг устгах боломжгүй!!!" }],
    });
  } else {
    where[Op.and] = [
      {
        CreatedUserID: {
          [Op.eq]: deletedata.CreatedUserID,
        },

        OpportunityID: {
          [Op.eq]: deletedata.OpportunityID,
        },
      },
    ];
    const perData = await opportunity_owner.findOne({
      where: where,
    });

    let UserPercent = deletedata.UserPercent + perData.UserPercent;

    where[Op.and] = [
      {
        UserID: {
          [Op.eq]: deletedata.CreatedUserID,
        },
        OpportunityID: {
          [Op.eq]: deletedata.OpportunityID,
        },
      },
    ];
    const data11 = await opportunity_owner.update(
      { UserPercent },
      {
        where: where,
      }
    );
    const data = await opportunity_owner.destroy({
      where: {
        OpportunityOwnerID: id,
      },
    });

    res.status(200).send({
      success: true,
      data: data,
    });
  }
});
module.exports.getSelectUsers = asyncHandler(async (req, res) => {
  const { params } = req.query;
  var par = JSON.parse(params);
  console.log({ par });
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

  console.log({ where });
  const rows = await opportunity_owner.findAll({
    where: where,
    include: [
      {
        model: users,
        as: "users",
      },
    ],
  });

  res.status(200).send({
    success: true,
    data: { data: rows },
  });
});
