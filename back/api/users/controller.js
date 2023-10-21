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

// Reading our test file
module.exports.convert = asyncHandler(async (req, res) => {
  console.log("start-------->");
  const file = reader.readFile("api/users/test.xlsx");
  const temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[0]]);

  let LegalEntityId = null;
  let ContactID = null;

  for (let i = 0; i < temp.length; i++) {
    const project = await legal_entity.findOne({
      where: {
        LegalEntityRegisterNo: "" + temp[i]["LegalEntityRegisterNo"] + "",
      },
    });
    let ContactName = null;
    if (project === null) {
      const projectnew = await legal_entity.create({
        LegalEntityName: temp[i]["LegalEntityName"],
        LegalEntityRegisterNo: temp[i]["LegalEntityRegisterNo"],
        SourceType: 1,
        UserID: 0,
      });
      LegalEntityId = projectnew.LegalEntityId;
      ContactName = projectnew.LegalEntityName;
    } else {
      LegalEntityId = project.LegalEntityId;
      ContactName = project.LegalEntityName;
    }

    const contactTempData = await contact.findOne({
      include: {
        model: legal_entity,
        as: "legal_entity",
        where: {
          LegalEntityId: {
            [Op.like]: "" + LegalEntityId + "",
          },
        },
      },
    });

    let Type = "Байгууллага";

    let Phone = temp[i]["Phone"] ? temp[i]["Phone"] : "";

    let URL = temp[i]["URL"] ? temp[i]["URL"] : "";

    let Address = temp[i]["Address"] ? temp[i]["Address"] : "";

    let CompanyIndustryID = null;
    let CreatedUserID = null;

    const cu = await users.findOne({
      where: {
        EmpFirstName: "" + temp[i]["EmpFirstName"] + "",
      },
    });

    if (cu != null) {
      CreatedUserID = cu.UserID;
    }
    if (contactTempData === null) {
      if (temp[i]["CompanyIndustryID"] != null) {
        const lfu = {};
        lfu[Op.and] = [
          {
            Description: {
              [Op.like]: "" + temp[i]["CompanyIndustryID"] + "",
            },
          },
        ];
        if (temp[i]["CompanyIndustryID"] != null) {
          const [indusData, created] = await company_industry.findOrCreate({
            where: lfu,
            defaults: {
              Description: temp[i]["CompanyIndustryID"],
              IsActive: 1,
              CreatedUserID: 1,
            },
          });
          if (created) {
            CompanyIndustryID = indusData.CompanyIndustryID;
          }
          CompanyIndustryID = indusData.CompanyIndustryID;
        }
      }

      // console.log({ indusData });
      createContact = await contact.create({
        Type,
        LegalEntityID: LegalEntityId,
        ContactName,
        Phone,
        Address,
        Email: "",
        ContactNote: "",
        URL,
        CompanyIndustryID: CompanyIndustryID,
        UserID: CreatedUserID,
      });

      ContactID = createContact.ContactID;
    } else {
      ContactID = contactTempData.ContactID;
    }

    let OpportunityDescription = temp[i]["OpportunityDescription"];
    let OpportunityType = temp[i]["OpportunityType"];

    let ChancesOfSuccess = temp[i]["ChancesOfSuccess"];
    let EstimatedStartDate = getJsDateFromExcel(temp[i]["EstimatedStartDate"]);
    let EstimatedEndDate = getJsDateFromExcel(temp[i]["EstimatedEndDate"]);

    console.log({ EstimatedStartDate, EstimatedEndDate });
    let OpportunityCloseTypeID =
      temp[i]["OpportunityDescription"] === "гэрээ хийсэн " ? 1 : 0;
    let OpportunityStatus =
      temp[i]["OpportunityDescription"] === "гэрээ хийсэн "
        ? "Ялсан"
        : "Хийгдэж байгаа";
    let OpportunityCloseDescription =
      temp[i]["OpportunityDescription"] === "гэрээ хийсэн"
        ? null
        : "Гэрээ байгуулав";

    const opportunityData = await opportunity.create({
      ContactID,
      OpportunityCode: 10,
      OpportunityDescription,
      OpportunityType,
      ChancesOfSuccess,
      EstimatedStartDate: EstimatedStartDate,
      EstimatedEndDate: EstimatedEndDate,
      OpportunityCloseDescription,
      OpportunityCloseTypeID,
      OpportunityStatus,
      CreatedUserID,
    });

    let EmployeeName = temp[i]["EmployeeName"];
    let EmployeePhone = temp[i]["EmployeePhone"];
    let Email = temp[i]["Email"];
    let EmployeePositionID = null;

    const lw = {};
    lw[Op.and] = [
      {
        Description: {
          [Op.like]: "" + temp[i]["employee_position"] + "",
        },
      },
    ];
    if (temp[i]["employee_position"] != null) {
      const [employeepData, created] = await employee_position.findOrCreate({
        where: lw,
        defaults: {
          Description: temp[i]["employee_position"],
          IsActive: 1,
          CreatedUserID: 1,
        },
      });

      console.log({ employeepData });
      if (created) {
        EmployeePositionID = employeepData.EmployeePositionID;
      }
      EmployeePositionID = employeepData.EmployeePositionID;
      if (EmployeeName) {
        const employeeData = await employee.create({
          ContactID,
          EmployeePhone,
          EmployeeName,
          Email,
          EmployeePositionID,
        });

        console.log({ employeeData });
      }
    }

    if (opportunityData != null) {
    }
    if (
      opportunityData != null &&
      temp[i]["OpportunityDescription"] &&
      temp[i]["InteractionDate"]
    ) {
      let InteractionTypeID = temp[i]["OpportunityDescription"];
      let InteractionDate = getJsDateFromExcel(temp[i]["InteractionDate"]);
      let Note = temp[i]["Note"];

      const qw = {};
      qw[Op.and] = [
        {
          Description: {
            [Op.like]: "" + InteractionTypeID + "",
          },
        },
      ];

      let [it, created] = await interaction_type.findOrCreate({
        where: qw,
        defaults: {
          Description: temp[i]["OpportunityDescription"],
          IsActive: 1,
          CreatedUserID: 1,
        },
      });

      InteractionTypeID = it.InteractionTypeID;
      const interactionData = await interaction.create({
        OpportunityID: opportunityData.OpportunityID,
        InteractionTypeID,
        RelatedUserID: CreatedUserID,
        InteractionDate,
        Note,
      });
    }

    let ProductName = temp[i]["ProductName"];
    let ProductID = null;
    let ProductPackageID = null;

    if (opportunityData != null) {
      const opportunity_ownerData = await opportunity_owner.create({
        UserID: CreatedUserID,
        CreatedUserID,
        UserPercent: 100,
        OpportunityID: opportunityData.OpportunityID,
      });
    }
    let EstimatedValue = temp[i]["EstimatedValue"];
    let EstimatedPercent = temp[i]["EstimatedPercent"]
      ? temp[i]["EstimatedPercent"]
      : 3;
    let TotalFeeAmount = temp[i]["TotalFeeAmount"];
    for (let j = 0; j < ProductName.split(",").length; j++) {
      let key = ProductName.split(",")[j];

      let pwhere = {};
      pwhere = {};
      const [productData, created] = await product.findOrCreate({
        where: {
          ProductName: {
            [Op.like]: "%" + key + "%",
          },
        },

        defaults: {
          ProductName: key,
          IsCompany: 1,
          IsPerson: 1,
          ProductPercent: 0,
          ProductCode: "НЭМЭЛТ",
        },
      });
      let ppd111 = [];

      if (created) {
        console.log("fuck");
        ProductID = productData.ProductID;
        const pp = await product_package.create({
          ProductID,
          ProductPackageName: "Багц 1",
        });
        ProductPackageID = pp.ProductPackageID;

        const rd = await product_risk_detail.findAll({
          attributes: ["ProductRiskDetailID"],
        });

        rd.forEach(async (element) => {
          const ppd = await product_package_detail.create({
            ProductPackageID,
            RiskDetailID: element.ProductRiskDetailID,
            IsActive: 1,
          });
          ppd111.push(ppd.ProductPackageDetailID);
        });

        const pr = await product_risk.findAll({});

        pr.forEach(async (element) => {
          const ppds = await product_package_service.create({
            ProductID,
            RiskID: element.RiskID,
            CreatedUser: 1,
          });
        });
      } else {
        const oopp = {};
        oopp[Op.and] = [
          {
            ProductID: {
              [Op.eq]: productData.ProductID,
            },
          },
          {
            ProductPackageName: {
              [Op.like]: "%" + "Багц 1" + "%",
            },
          },
        ];
        const pp = await product_package.findOne({
          where: oopp,
        });

        console.log({ pp });
        ProductPackageID = pp.ProductPackageID;
        const ppd = await product_package_detail.findAll({
          where: { ProductPackageID: ProductPackageID },
        });
        ppd.forEach((element) => {
          ppd111.push(element.ProductPackageDetailID);
        });
      }
      if (productData != null) {
        ProductID = productData.ProductID;
      }
      ProductID = productData.ProductID;

      if (opportunityData != null) {
        let opportunitydetailData = null;
        if (j === 0) {
          opportunitydetailData = await opportunity_detail.create({
            OpportunityID: opportunityData.OpportunityID,
            ProductID,
            ProductPackageID,
            EstimatedValue,
            EstimatedPercent,
            TotalFeeAmount,
          });
        } else {
          opportunitydetailData = await opportunity_detail.create({
            OpportunityID: opportunityData.OpportunityID,
            ProductID,
            ProductPackageID,
            EstimatedValue: 0,
            EstimatedPercent: 0,
            TotalFeeAmount: 0,
          });
        }

        if (opportunitydetailData != null) {
          const rd = await product_risk_detail.findAll({
            attributes: ["ProductRiskDetailID"],
          });
          console.log({ ppd111 });

          for (let o = 0; o < ppd111.length; o++) {
            const odp = await opportunity_detail_package.create({
              IsActive: 1,
              RiskDetailID: rd[o].ProductRiskDetailID,
              ProductPackageDetailID: ppd111[o],
              OpportunityDetailID: opportunitydetailData.OpportunityDetailID,
            });
          }
          // ppd111.forEach(async (element, index) => {

          // });
        }
      }
    }
    console.log({ te: temp[i] });
  }
});

module.exports.list = asyncHandler(async (req, res) => {
  const { params } = req.query;
  var par = JSON.parse(params);

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
      {
        attributes: ["Description"],
        model: user_role,
        as: "user_role",
      },
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
      UserID: id,
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
      UserID: id,
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
