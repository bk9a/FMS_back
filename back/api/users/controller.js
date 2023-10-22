const asyncHandler = require("express-async-handler");
const {
  Op,
  sequelize,
  users,
  user_role,
  contact,
  company_industry,
  opportunity,
  interaction,
  legal_entity,
  opportunity_detail,
  employee,
  employee_position,
  product,
  product_package,
  product_package_detail,
  product_risk,
  product_risk_detail,
  product_package_service,
  opportunity_detail_package,
  opportunity_owner,
  interaction_type,
} = require("../../model");

const jwt = require("jsonwebtoken");
const reader = require("xlsx");
const { getJsDateFromExcel } = require("excel-date-to-js");



module.exports.list = asyncHandler(async (req, res) => {
  // const { params } = req.query;
  // var par = JSON.parse(params);

  const where = {};

  const pager = req.pager;
  const { rows, count } = await users.findAndCountAll({
    where: where,
    // order: [["UserName", "UserName"]],

    include: [
      // {
      //   model: user_role,
      //   as: "user_role",
      // },
    ],
    ...pager,
  });

  res.status(200).send({
    success: true,
    data: { data: rows, count: count },
  });
});

module.exports.selectlist = asyncHandler(async (req, res) => {
  const where = {
    RoleID: {
      [Op.eq]: 2,
    },
  };

  const rows = await users.findAll({
    where: where,
  });

  res.status(200).send({
    success: true,
    data: { data: rows },
  });
});
module.exports.selectlistv1 = asyncHandler(async (req, res) => {
  const where = {
    RoleID: {
      [Op.eq]: 2,
    },
  };

  const rows = await users.findAll({
    where: where,
  });

  res.status(200).send({
    success: true,
    data: { data: rows },
  });
});
module.exports.create = asyncHandler(async (req, res) => {
  const createData = req.body;
  const details = createData.opportunity_package_detail;
  const data = await users.create(createData);
  res.status(200).send({
    success: true,
    data: data,
  });
});

module.exports.show = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const data = await users.findByPk(id, {
    include: [
      // {
      //   attributes: ["Description"],
      //   model: user_role,
      //   as: "user_role",
      // },
    ],
  });

  res.status(200).send({
    success: true,
    data: data,
  });
});
const getOrderValue = (field) => {
  if (!field) {
    return null;
  }
  let value = [];

  for (let i = 0; i < field.split(",").length; i++) {
    let key = field.split(",")[i];
    if (key) {
      let val = [];
      for (let j = 0; j < key.split(" ").length; j++) {
        let key1 = field.split(" ")[j];
        if (key1) {
          val.push(key1);
        }
      }
      value.push(val);
    }
  }
  return value;
};
const getOperator = ({ opp, field, value }) => {
  if (opp === "eq") {
    return {
      [field]: {
        [Op.eq]: value,
      },
    };
  } else if (opp === "ne") {
    return {
      [field]: {
        [Op.ne]: value,
      },
    };
  } else if (opp === "gt") {
    return {
      [field]: {
        [Op.gt]: value,
      },
    };
  } else if (opp === "ge") {
    return {
      [field]: {
        [Op.gte]: value,
      },
    };
  } else if (opp === "lt") {
    return {
      [field]: {
        [Op.lt]: value,
      },
    };
  } else if (opp === "le") {
    return {
      [field]: {
        [Op.lte]: value,
      },
    };
  }
};
const getStringSearch = ({ key }) => {
  var z = key.split(/[.,())]/);
  console.log(z);
  let opp = z[0];

  if (opp === "endswith") {
    let field = z[2];
    let value = z[4];

    value = value.replace("'", "");
    value = value.replace("'", "");
    return {
      [field]: {
        [Op.endsWith]: value,
      },
    };
  } else if (opp === "startswith") {
    let field = z[2];
    let value = z[4];

    value = value.replace("'", "");
    value = value.replace("'", "");
    return {
      [field]: {
        [Op.startsWith]: value,
      },
    };
  } else if (opp === "not substringof") {
    let field = z[3];
    let value = z[1];

    value = value.replace("'", "");
    value = value.replace("'", "");
    return {
      [field]: {
        [Op.notLike]: "%" + value + "%",
      },
    };
  } else if (opp === "substringof") {
    let field = z[3];
    let value = z[1];
    console.log({ field, value });
    value = value.replace("'", "");
    value = value.replace("'", "");
    return {
      [field]: {
        [Op.like]: "%" + value + "%",
      },
    };
  }
};
const getFilterValue = (field) => {
  if (!field) {
    return null;
  }
  const where = {};
  where[Op.and] = [];

  for (let i = 0; i < field.split(" and ").length; i++) {
    let key = field.split(" and ")[i];
    if (3 === key.split(" ").length) {
      if (key) {
        key = key.replace("(", "");
        key = key.replace(")", "");
        key = key.replace("'", "");
        key = key.replace("'", "");
        let field = key.split(" ")[0];
        let opp = key.split(" ")[1];
        let value = key.split(" ")[2];

        let a = getOperator({ field, opp, value });
        where[Op.and].push(a);
      }
    } else {
      let a = getStringSearch({ key });
      where[Op.and].push(a);
    }
  }
  return where;
};
const getSelectValue = (field) => {
  if (!field) {
    return null;
  }

  return field.split(",");
};
module.exports.test = asyncHandler(async (req, res) => {
  console.log({ req });
  const par = req.query;
  console.log({ req });
  const order = getOrderValue(par.$orderby);
  const where = getFilterValue(par.$filter);
  const limit = par.$top ? parseInt(par.$top + "") : 10;
  const offset = par.$skip ? parseInt(par.$skip + "") : 0;
  const select = getSelectValue(par.$select);
  const { rows, count } = await users.findAndCountAll({
    attributes: select,
    order: order,
    where: where,

    limit: limit,
    offset: offset,
    include: [
      {
        model: user_role,
        as: "user_role",
      },
    ],
  });

  res.status(200).send({
    d: { results: rows, __count: count },
  });
});

module.exports.test1 = asyncHandler(async (req, res) => {
  console.log({ req });
  console.log({ bdy: req.body });
  // const par = req.query;

  // const order = getOrderValue(par.$orderby);
  // const where = getFilterValue(par.$filter);
  // const limit = par.$top ? parseInt(par.$top + "") : 10;
  // const offset = par.$skip ? parseInt(par.$skip + "") : 0;
  // const select = getSelectValue(par.$select);
  // const { rows, count } = await users.findAndCountAll({
  //   attributes: select,
  //   order: order,
  //   where: where,

  //   limit: limit,
  //   offset: offset,
  //   include: [
  //     {
  //       model: user_role,
  //       as: "user_role",
  //     },
  //   ],
  // });

  res.status(200).send({
    d: {},
  });
});
module.exports.deletetest = asyncHandler(async (req, res) => {
  console.log({ req });
  // const par = req.query;

  // const order = getOrderValue(par.$orderby);
  // const where = getFilterValue(par.$filter);
  // const limit = par.$top ? parseInt(par.$top + "") : 10;
  // const offset = par.$skip ? parseInt(par.$skip + "") : 0;
  // const select = getSelectValue(par.$select);
  // const { rows, count } = await users.findAndCountAll({
  //   attributes: select,
  //   order: order,
  //   where: where,

  //   limit: limit,
  //   offset: offset,
  //   include: [
  //     {
  //       model: user_role,
  //       as: "user_role",
  //     },
  //   ],
  // });

  res.status(200).send({
    d: { req },
  });
});

module.exports.update = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  const data = await users.update(updateData, {
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
  const data = await users.destroy({
    where: {
      id: id,
    },
  });

  res.status(200).send({
    success: true,
    data: data,
  });
});
module.exports.login = asyncHandler(async (req, res, next) => {
  const { Username, Password } = req.body;

  console.log({ Username, Password });
  var error = null;
  // Оролтыгоо шалгана

  if (!Username || !Password) {
    error = "Имэйл болон нууц үгээ дамжуулна уу";
  }
  // Тухайн хэрэглэгчийн хайна
  const user = await users.findOne({ where: { Username } });
  if (user) {
    if (user.password === Password) {
      delete user.dataValues["password"];

      jwt.sign(
        { user },
        process.env.JWT_PASS,
        { expiresIn: "3600s" },
        (err, token) => {
          res.status(200).json({
            success: true,
            token: token,
            // user: user,
          });
        }
      );
    } else {
      res.status(200).json({
        success: false,
        message: "Нэвтрэх нэр эсвэл нууц үг буруу байна!",
      });
    }
  } else {
    res.status(200).json({
      success: false,
      message: "Нэвтрэх нэр эсвэл нууц үг буруу байна!!!",
    });
  }
});

module.exports.checklogin = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    user: req.LogedUser,
  });
});

// module.exports.getNoti = asyncHandler(async (req, res) => {
//   res.status(200).json({
//     success: true,
//     user: req.LogedUser,
//   });
// });
module.exports.getNoti = asyncHandler(async (req, res) => {
  let end = new Date();

  console.log({ end });
  const where = {};

  where[Op.and] = [
    {
      OpportunityStatus: {
        [Op.like]: "%" + "Хаагдаагүй" + "%",
      },
    },
  ];

  end
    ? where[Op.and].push({
        EstimatedEndDate: {
          [Op.lt]: end,
        },
      })
    : null;

  const ownerWhere = {};
  req.LogedUser.RoleID === 2
    ? (ownerWhere[Op.and] = [
        {
          UserID: {
            [Op.eq]: req.LogedUser.UserID,
          },
        },
      ])
    : null;

  const count = await opportunity.findAll({
    where: where,
    include: [
      {
        model: opportunity_owner,
        as: "opportunity_owner",
        where: ownerWhere,
      },
      {
        attributes: ["ContactName", "LegalEntityId"],
        model: contact,
        as: "contact",
        where: {
          ContactID: {
            [Op.not]: null,
          },
        },
      },
    ],
    order: [["CreatedDate", "DESC"]],
  });

  res.status(200).send({
    success: true,
    qr: "kok",
    data: { data: count, count: count.length },
  });
});
