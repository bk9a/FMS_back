const asyncHandler = require("express-async-handler");
const {
  Op,
  Sequelize,
  product,
  opportunity,
  contact,
  users,
  opportunity_detail,
  legal_entity,
  company_industry,
  opportunity_owner,
  interaction,
  opportunity_close_type,
  interaction_type,
  opportunity_type,
  salesPlan,
} = require("../../model");

const e = require("express");
module.exports.list = asyncHandler(async (req, res) => {
  const { params } = req.query;

  var par = JSON.parse(params);

  console.log({ EstimatedEndDate: par.EstimatedEndDate });
  let end = par.EstimatedEndDate ? new Date(par.EstimatedEndDate) : new Date();
  let start = par.EstimatedStartDate
    ? new Date(par.EstimatedStartDate)
    : new Date();
  console.log({ end });
  const where = {};
  if (par) {
    where[Op.and] = [
      {
        OpportunityStatus: {
          [Op.like]: "%" + par.OpportunityStatus + "%",
        },
      },
    ];
  }

  par.OpportunityDescription != ""
    ? where[Op.and].push({
        OpportunityDescription: {
          [Op.like]: "%" + par.OpportunityDescription + "%",
        },
      })
    : null;
  par.EstimatedEndDate
    ? where[Op.and].push({
        EstimatedEndDate: {
          [Op.lt]: end,
        },
      })
    : null;

  par.EstimatedStartDate
    ? where[Op.and].push({
        EstimatedStartDate: {
          [Op.lt]: start,
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
  const contactWhere = {};
  contactWhere[Op.and] = [
    {
      "$contact.ContactID$": {
        [Op.not]: null,
      },
    },
    {
      "$contact.ContactName$": {
        [Op.like]: "%" + par["contact.ContactName"] + "%",
      },
    },
  ];
  const legalWhere = {};
  legalWhere[Op.and] = [
    {
      LegalEntityRegisterNo: {
        [Op.like]:
          "%" + par["contact.legal_entity.LegalEntityRegisterNo"] + "%",
      },
    },
  ];
  const pager = req.pager;

  const { rows, count } = await opportunity.findAndCountAll({
    where: where,
    order: [["CreatedDate", "DESC"]],
    include: [
      {
        attributes: ["ContactName", "LegalEntityId"],
        model: contact,
        as: "contact",
        where: contactWhere,
        include: [
          {
            // attributes: ["LegalEntityRegisterNo"],
            model: legal_entity,
            as: "legal_entity",
            where: {
              LegalEntityRegisterNo: {
                [Op.like]:
                  "%" + par["contact.legal_entity.LegalEntityRegisterNo"] + "%",
              },
            },
          },
        ],
      },
      {
        // attributes: ["LegalEntityRegisterNo"],
        model: opportunity_detail,
        as: "opportunity_detail",
        include: [
          {
            // attributes: ["LegalEntityRegisterNo"],
            model: product,
            as: "product",
          },
        ],
      },

      {
        attributes: ["EmpFirstName"],
        model: users,
        as: "users",
        where: {
          EmpFirstName: {
            [Op.like]: "%" + par["users.EmpFirstName"] + "%",
          },
        },
      },
      {
        model: opportunity_owner,
        as: "opportunity_owner",
        where: ownerWhere,
      },
    ],
    ...pager,
  });
  let newRows = [];

  rows.forEach((rowitem) => {
    let productStr = "";
    rowitem.opportunity_detail.forEach((item) => {
      productStr = productStr + "-" + item.product.ProductCode;
    });

    newRows.push({ ...rowitem.dataValues, productStr });
  });

  res.status(200).send({
    success: true,
    data: { data: newRows, count: count },
  });
});
// [
//   Sequelize.fn(
//     "SUM",
//     Sequelize.col("opportunity_detail.TotalFeeAmount")
//   ),
//   "total",
// ],

module.exports.performancelist = asyncHandler(async (req, res) => {
  let where = {};
  const pager = req.pager;
  const { params } = req.query;

  // let tempUser = par.UserID;
  // let tempUser = par.UserID;
  var par = JSON.parse(params);
  let whereInt = {};
  par.InteractionTypeID != null && par.InteractionTypeID != ""
    ? (whereInt[Op.and] = {
        InteractionTypeID: {
          [Op.eq]: par.InteractionTypeID,
        },
      })
    : null;
  par.UserID != ""
    ? (where[Op.and] = {
        CreatedUserID: {
          [Op.eq]: par.UserID,
        },
        EstimatedStartDate: {
          [Op.between]: [par.EstimatedStartDate, par.EstimatedEndDate],
        },
      })
    : (where[Op.and] = {
        EstimatedStartDate: {
          [Op.between]: [par.EstimatedStartDate, par.EstimatedEndDate],
        },
      });

  par.OpportunityCloseTypeID != ""
    ? (where[Op.and] = {
        ...where[Op.and],
        OpportunityCloseTypeID: { [Op.eq]: par.OpportunityCloseTypeID },
      })
    : (where[Op.and] = where[Op.and]);
  let rows;
  if (par.InteractionTypeID === "") {
    rows = await opportunity.findAll({
      where: where,
      include: [
        {
          model: users,
          as: "users",
        },
        {
          model: contact,
          as: "contact",
          where: {
            ContactName: {
              [Op.like]: "%" + par.ContactName + "%",
            },
          },
        },
        {
          model: interaction,
          as: "interaction",
          include: [
            {
              model: interaction_type,
              as: "interaction_type",
            },
          ],
        },
        {
          model: opportunity_detail,
          as: "opportunity_detail",
          where: {},
          include: [
            {
              model: product,
              as: "product",
              where: {
                ProductName: {
                  [Op.like]: "%" + par.ProductName + "%",
                },
              },
            },
          ],
        },
      ],
    });
  } else {
    rows = await opportunity.findAll({
      where: where,
      include: [
        {
          model: users,
          as: "users",
        },
        {
          model: contact,
          as: "contact",
          where: {
            ContactName: {
              [Op.like]: "%" + par.ContactName + "%",
            },
          },
        },
        {
          model: interaction,
          as: "interaction",
          where: whereInt,
          include: [
            {
              model: interaction_type,
              as: "interaction_type",
              where: {},
            },
          ],
        },
        {
          model: opportunity_detail,
          as: "opportunity_detail",
          where: {},
          include: [
            {
              model: product,
              as: "product",
              where: {
                ProductName: {
                  [Op.like]: "%" + par.ProductName + "%",
                },
              },
            },
          ],
        },
      ],
    });
  }

  const { page } = req.query;

  let newRows = [];

  rows.forEach((row) => {
    let status = {};
    if (row.OpportunityCloseTypeID === 0) {
      status = {
        tender: 0,
        sanal: 0,
        geree: 0,
        nemelt: 0,
        active: 1,
      };
    } else {
      row.OpportunityType === "Санал"
        ? (status = {
            tender: 0,
            sanal: 1,
            geree: 0,
            nemelt: 0,
            active: 0,
          })
        : row.OpportunityType === "Тендер"
        ? (status = {
            tender: 1,
            sanal: 0,
            geree: 0,
            nemelt: 0,
            active: 0,
          })
        : row.OpportunityType === "Гэрээ"
        ? (status = {
            tender: 0,
            sanal: 0,
            geree: 1,
            nemelt: 0,
            active: 0,
          })
        : (status = {
            tender: 0,
            sanal: 0,
            geree: 0,
            nemelt: 1,
            active: 0,
          });
    }

    let inter = "";
    let les = 0;
    let LesCount = 0;

    for (let i = 0; i < row.interaction.length; i++) {
      inter = inter + "-" + row.interaction[i].interaction_type.Description;
      if (row.interaction[i].InteractionTypeID === 5) {
        les = les + 1;
        LesCount = LesCount + row.interaction[i].CountPeople;
      }
    }
    let prod = "";
    let val = 0;

    for (let i = 0; i < row.opportunity_detail.length; i++) {
      prod = prod + "-" + row.opportunity_detail[i].product.ProductName + "";
      val = val + row.opportunity_detail[i].TotalFeeAmount;
    }

    newRows.push({
      manager: row.users.EmpFirstName,
      contactName: row.contact.ContactName,
      Date: row.EstimatedStartDate,
      Count: 1,
      ...status,
      inter,
      les,
      LesCount,
      prod,
      val,
    });
  });

  let a1 = 0;
  let a2 = 0;
  let a3 = 0;
  let a4 = 0;

  if (par.startVal != "" && par.endVal != "") {
    newRows = newRows.filter(
      (val) =>
        val.val > parseInt(par.startVal) && val.val < parseInt(par.endVal)
    );
  } else if (par.startVal === "" && par.endVal != "") {
    newRows = newRows.filter((val) => val.val < parseInt(par.endVal));
  } else if (par.startVal != "" && par.endVal === "") {
    newRows = newRows.filter((val) => val.val > parseInt(par.startVal));
  }
  let tempCount = newRows.length;
  newRows.forEach((item) => {
    a1 = a1 + item.Count;
    a2 = a2 + item.les;
    a3 = a3 + item.LesCount;
    a4 = a4 + item.val;
  });

  newRows = paginate({
    array: newRows,
    page_size: page.size,
    page_number: page.number,
  });
  res.status(200).send({
    success: true,
    data: { data: newRows, count: tempCount, rows, a1, a2, a3, a4 },
  });
});
module.exports.reportlist = asyncHandler(async (req, res) => {
  let where = {};
  const pager = req.pager;
  const { params } = req.query;
  var par = JSON.parse(params);

  req.LogedUser.RoleID === 2
    ? (where[Op.and] = {
        CreatedUserID: {
          [Op.eq]: req.LogedUser.UserID,
        },
        EstimatedStartDate: {
          [Op.between]: [par.EstimatedStartDate, par.EstimatedEndDate],
        },
      })
    : par.UserID != ""
    ? (where[Op.and] = {
        CreatedUserID: {
          [Op.eq]: par.UserID,
        },
        EstimatedStartDate: {
          [Op.between]: [par.EstimatedStartDate, par.EstimatedEndDate],
        },
      })
    : (where[Op.and] = {
        EstimatedStartDate: {
          [Op.between]: [par.EstimatedStartDate, par.EstimatedEndDate],
        },
      });
  par.OpportunityCloseTypeID != ""
    ? (where[Op.and] = {
        ...where[Op.and],
        OpportunityCloseTypeID: { [Op.eq]: par.OpportunityCloseTypeID },
      })
    : (where[Op.and] = where[Op.and]);

  let rows1 = await contact.findAll({
    attributes: ["ContactID", "CreatedDate", "LegalEntityID"],
    where: {
      ContactName: {
        [Op.like]: "%" + par.ContactName + "%",
      },
    },
    order: [["CreatedDate", "DESC"]],
    include: [
      {
        model: legal_entity,
        as: "legal_entity",
        // where: {
        //   LegalEntityRegisterNo: {
        //     [Op.eq]: "%" + par.LegalEntityRegisterNo ,
        //   },
        // },
      },
      {
        model: company_industry,
        as: "company_industry",
      },
      {
        attributes: [
          "OpportunityDescription",
          "OpportunityType",
          "ChancesOfSuccess",
          "EstimatedStartDate",
          "EstimatedEndDate",
          "CreatedUserID",
        ],
        model: opportunity,
        as: "opportunity",
        include: [
          {
            model: users,
            as: "users",
          },
          {
            model: opportunity_detail,
            as: "opportunity_detail",
            include: [
              {
                model: product,
                as: "product",
                where: {
                  ProductName: {
                    [Op.like]: "%" + par.ProductName + "%",
                  },
                },
              },
            ],
          },
        ],
        where: where,
      },
    ],
  });
  let cnt = 0;

  let newRows = [];
  let tval = 0;
  let tfee = 0;

  rows1.forEach((item, index) => {
    let cntOpp = 0;
    let val = 0;
    let fee = 0;

    let newOpp = [];

    item.opportunity.forEach((dt, index) => {
      let cntDt = 0;
      cntDt =
        dt.opportunity_detail.length === 0 ? 1 : dt.opportunity_detail.length;
      let t = dt.dataValues;
      cntOpp = cntOpp + cntDt;
      // if (cntDt > 0) {
      newOpp.push({ ...t, cntDt });
      dt.opportunity_detail.forEach((dl) => {
        val = val + dl.EstimatedValue;
        fee = fee + dl.TotalFeeAmount;
      });
      // }
    });

    let tmp = newOpp;
    // if (tmp.length > 0) {
    cnt++;
    newRows.push({ ...item.dataValues, opportunity: tmp, cntOpp, val, fee });
    // }
    tval = tval + val;
    tfee = tfee + fee;
  });
  const { page } = req.query;

  newRows = paginate({
    array: newRows,
    page_size: page.size,
    page_number: page.number,
  });
  res.status(200).send({
    success: true,
    data: { data: newRows, count: cnt, tval, tfee },
  });
});
function paginate({ array, page_size, page_number }) {
  return array.slice((page_number - 1) * page_size, page_number * page_size);
}

module.exports.totalInteraction = asyncHandler(async (req, res) => {
  const { params } = req.query;
  var par = JSON.parse(params);

  let newData = [];

  let it = await interaction_type.findAll({});
  let ot = await opportunity_type.findAll({});
  let usersss = await users.findAll({
    where: {
      RoleID: 2,
    },
    include: [
      {
        model: opportunity,
        as: "opportunity",
        where: {
          EstimatedStartDate: {
            [Op.between]: [par.EstimatedStartDate, par.EstimatedEndDate],
          },
        },
      },
    ],
  });

  let contactCount = 0;
  for (let u = 0; u < usersss.length; u++) {
    let where = {};
    where[Op.and] = {
      EstimatedStartDate: {
        [Op.between]: [par.EstimatedStartDate, par.EstimatedEndDate],
      },
      CreatedUserID: {
        [Op.eq]: usersss[u].UserID,
      },
    };
    let aw = await opportunity.count({
      group: "ContactID",
      where: where,
    });
    contactCount = contactCount + aw.length;
    let otType = [];
    for (let i = 0; i < ot.length; i++) {
      let where = {};
      where[Op.and] = {
        EstimatedStartDate: {
          [Op.between]: [par.EstimatedStartDate, par.EstimatedEndDate],
        },
        CreatedUserID: {
          [Op.eq]: usersss[u].UserID,
        },
        OpportunityType: {
          [Op.like]: ot[i].OppotrunityType,
        },
      };

      let { rows: dat, count: opCount } = await opportunity.findAndCountAll({
        where: where,
        include: [
          {
            model: interaction,
            as: "interaction",
          },
        ],
      });
      let iType = [];
      let opWithInt = 0;
      if (dat && dat.length > 0) {
        for (let j = 0; j < it.length; j++) {
          let op = 0;

          for (let r = 0; r < dat.length; r++) {
            // let { rows: dat1, count: opCount1 } =
            //   await interaction.findAndCountAll({
            //     where: {
            //       [Op.and]: {
            //         OpportunityID: dat[r].OpportunityID,
            //         InteractionTypeID: it[j].InteractionTypeID,
            //       },
            //     },
            //   });
            let opCount1 = 0;
            if (dat[r].interaction.length > 0) {
              dat[r].interaction.forEach((inter) => {
                if (inter.InteractionTypeID === it[j].InteractionTypeID) {
                  opCount1++;
                }
              });
            }
            if (opCount1 > 0) {
              opWithInt = opWithInt + opCount1;
            }
            op = op + opCount1;
          }
          iType.push({ op: it[j].InteractionTypeID, count: op });
        }
      }

      otType.push({
        OpportunityTypeID: ot[i].OpportunityTypeID,
        name: ot[i].OppotrunityType,
        count: opCount,
        iType: iType,
        opWithInt,
      });
    }
    if (aw.length > 0) {
      newData.push({ ...usersss[u].dataValues, otType, cus: aw.length });
    }
  }
  let newOt = [];
  let c = 0;
  ot.forEach((oy) => {
    let newIT = [];
    let qw = 0;
    let qw2 = 0;
    newData.forEach((el) => {
      el.otType.forEach((er) => {
        if (er.OpportunityTypeID === oy.OpportunityTypeID) {
          qw = qw + er.count;
          qw2 = qw2 + er.opWithInt;
        }
      });
    });
    it.forEach((et) => {
      c = 0;
      newData.forEach((el) => {
        el.otType.forEach((er) => {
          if (er.OpportunityTypeID === oy.OpportunityTypeID) {
            er.iType.forEach((ey) => {
              if (et.InteractionTypeID === ey.op) {
                c = c + ey.count;
              }
            });
          }
        });
      });

      newIT.push({ ...et.dataValues, c });
    });

    newOt.push({ ...oy.dataValues, newIT, qw, qw2 });
  });

  res.status(200).send({
    success: true,
    data: { data: newData, count: 0, it, ot, newOt, contactCount },
  });
});

module.exports.dashboardData = asyncHandler(async (req, res) => {
  const { params } = req.query;
  var par = JSON.parse(params);
  const where = {};

  let date = new Date("2020-02-01");

  date.setFullYear(par.PlanYear ? par.PlanYear : 2022);
  date.setMonth(par.PlanMonth ? par.PlanMonth - 1 : 0);

  let date1 = new Date("2020-02-01");

  date1.setFullYear(par.PlanYear ? par.PlanYear : 2022);
  date1.setMonth(par.PlanMonth ? par.PlanMonth : 1);

  if (req.LogedUser.RoleID === 2) {
    where[Op.and] = {
      ClosedDate: {
        [Op.between]: [date, date1],
      },
      CreatedUserID: {
        [Op.eq]: req.LogedUser.UserID,
      },
      OpportunityCloseTypeID: {
        [Op.eq]: 1,
      },
    };
  } else {
    where[Op.and] = {
      ClosedDate: {
        [Op.between]: [date, date1],
      },
      OpportunityCloseTypeID: {
        [Op.eq]: 1,
      },
    };
  }

  let dateByYear1 = new Date("2020-01-01");
  let dateByYear2 = new Date("2020-01-01");
  dateByYear1.setFullYear(par.PlanYear ? par.PlanYear : 2021);
  dateByYear2.setFullYear(par.PlanYear ? par.PlanYear : 2021);

  let ser = ["Борлуулалт"];
  let where1 = {};
  let allser = 0;
  for (let i = 1; i < 13; i++) {
    let val1 = 0;
    dateByYear1.setMonth(i ? i - 1 : 0);
    dateByYear2.setMonth(i ? i : 1);

    let ui = par.UserID === "" ? 2 : par.UserID;
    if (req.LogedUser.RoleID === 2) {
      where1[Op.and] = {
        ClosedDate: {
          [Op.between]: [dateByYear1, dateByYear2],
        },
        CreatedUserID: {
          [Op.eq]: req.LogedUser.UserID,
        },
        OpportunityCloseTypeID: {
          [Op.eq]: 1,
        },
      };
    } else {
      where1[Op.and] = {
        ClosedDate: {
          [Op.between]: [dateByYear1, dateByYear2],
        },
        OpportunityCloseTypeID: {
          [Op.eq]: 1,
        },
        CreatedUserID: {
          [Op.eq]: ui,
        },
      };
    }
    let mt = await opportunity.findAll({
      where: where1,
      include: [
        {
          model: opportunity_detail,
          as: "opportunity_detail",
        },
      ],
    });

    mt.forEach((item) => {
      item.opportunity_detail.forEach((it) => {
        val1 = val1 + it.TotalFeeAmount;
      });
    });

    ser.push(val1 === 0 ? 0 : val1);
    allser = allser + val1;
  }
  ser.push(allser === 0 ? 0 : allser);

  let usersss = await opportunity.findAll({
    where: where,
    include: [
      {
        model: opportunity_detail,
        as: "opportunity_detail",
      },
    ],
  });

  if (req.LogedUser.RoleID === 2) {
    where[Op.and] = {
      SalesPlanYear: {
        [Op.eq]: par.PlanYear,
      },
      SalesManagerID: {
        [Op.eq]: req.LogedUser.UserID,
      },
    };
  } else {
    where[Op.and] = {
      SalesPlanYear: {
        [Op.eq]: par.PlanYear,
      },
    };
  }

  let sp = await salesPlan.findAll({
    where: where,
  });

  if (req.LogedUser.RoleID === 2) {
    where[Op.and] = {
      SalesPlanYear: {
        [Op.eq]: par.PlanYear,
      },
      SalesManagerID: {
        [Op.eq]: req.LogedUser.UserID,
      },
    };
  } else {
    where[Op.and] = {
      SalesPlanYear: {
        [Op.eq]: par.PlanYear,
      },
      SalesManagerID: {
        [Op.eq]: par.UserID,
      },
    };
  }

  let sp1 = await salesPlan.findAll({
    where: where,
  });
  let val11 = 0;
  req.LogedUser.RoleID === 2
    ? (val11 = sp1[0] && sp1 && sp1[0].PlanAmount ? sp1[0].PlanAmount : 0)
    : sp1.forEach((it) => (val11 = val11 + it.PlanAmount));
  let val1 = 0;
  req.LogedUser.RoleID === 2
    ? (val1 = sp[0] && sp && sp[0].PlanAmount ? sp[0].PlanAmount : 0)
    : sp.forEach((it) => (val1 = val1 + it.PlanAmount));

  let val = 0;

  let tender = 0;
  let sanal = 0;
  let geree = 0;
  let nemelt = 0;
  let notClosed = 0;

  if (req.LogedUser.RoleID === 2) {
    where[Op.and] = {
      CreatedUserID: {
        [Op.eq]: req.LogedUser.UserID,
      },
      OpportunityCloseTypeID: {
        [Op.eq]: 0,
      },
    };
  } else {
    where[Op.and] = {
      OpportunityCloseTypeID: {
        [Op.eq]: 0,
      },
    };
  }

  notClosed = await opportunity.count({
    where: where,
  });
  usersss.forEach((item) => {
    item.OpportunityType === "Санал"
      ? sanal++
      : item.OpportunityType === "Тендер"
      ? tender++
      : item.OpportunityType === "Гэрээ"
      ? geree++
      : item.OpportunityType === "Нэмэлт гэрээ"
      ? nemelt++
      : null;

    item.opportunity_detail.forEach((it) => {
      val = val + it.TotalFeeAmount;
    });
  });

  let series1 = ["Борлуулалтын төлөвлөгөө"];
  for (let i = 1; i < 13; i++) {
    series1.push(val11 / 12);
  }
  series1.push(val11);

  let ds = {
    tender,
    sanal,
    geree,
    nemelt,
    notClosed,
    val,
    val1: val1 / 12,
  };
  res.status(200).send({
    success: true,
    data: {
      data: usersss,
      count: 0,
      ds,
      ser,
      series1,
    },
  });
});
module.exports.totalStatus = asyncHandler(async (req, res) => {
  const { params } = req.query;
  var par = JSON.parse(params);

  let newData = [];

  let it = await interaction_type.findAll({});
  let ot = await opportunity_type.findAll({});
  let usersss = await users.findAll({
    where: {
      RoleID: 2,
    },
  });

  let ct = await opportunity_close_type.findAll({});
  let contactCount = 0;
  for (let u = 0; u < usersss.length; u++) {
    let where = {};
    where[Op.and] = {
      EstimatedStartDate: {
        [Op.between]: [par.EstimatedStartDate, par.EstimatedEndDate],
      },
      CreatedUserID: {
        [Op.eq]: usersss[u].UserID,
      },
    };
    let aw = await opportunity.count({
      group: "ContactID",
      where: where,
    });
    contactCount = contactCount + aw.length;
    let otType = [];
    for (let i = 0; i < ot.length; i++) {
      let temp = [];
      let Opc = 0;
      for (let cti = 0; cti < ct.length; cti++) {
        let where = {};
        where[Op.and] = {
          EstimatedStartDate: {
            [Op.between]: [par.EstimatedStartDate, par.EstimatedEndDate],
          },
          CreatedUserID: {
            [Op.eq]: usersss[u].UserID,
          },
          OpportunityType: {
            [Op.like]: ot[i].OppotrunityType,
          },
          OpportunityCloseTypeID: {
            [Op.eq]: ct[cti].OpportunityCloseTypeID,
          },
        };
        let opCount = await opportunity.count({
          where: where,
        });
        Opc = Opc + opCount;
        temp.push({ ...ct[cti].dataValues, count: opCount });
      }

      otType.push({
        OpportunityTypeID: ot[i].OpportunityTypeID,
        name: ot[i].OppotrunityType,
        count: Opc,
        temp,
      });
    }
    if (aw.length > 0) {
      newData.push({ ...usersss[u].dataValues, otType, cus: aw.length });
    }
  }
  let newOt = [];
  let c = 0;
  ot.forEach((oy) => {
    let newIT = [];
    let qw = 0;
    newData.forEach((el) => {
      el.otType.forEach((er) => {
        if (er.OpportunityTypeID === oy.OpportunityTypeID) {
          qw = qw + er.count;
        }
      });
    });
    ct.forEach((et) => {
      c = 0;
      newData.forEach((el) => {
        el.otType.forEach((er) => {
          if (er.OpportunityTypeID === oy.OpportunityTypeID) {
            er.temp.forEach((ey) => {
              if (et.OpportunityCloseTypeID === ey.OpportunityCloseTypeID) {
                c = c + ey.count;
              }
            });
          }
        });
      });

      newIT.push({ ...et.dataValues, c });
    });

    newOt.push({ ...oy.dataValues, newIT, qw });
  });

  res.status(200).send({
    success: true,
    data: { data: newData, count: 0, it: ct, ot, newOt, contactCount },
  });
});
module.exports.reportByManager = asyncHandler(async (req, res) => {
  let where = {};
  const pager = req.pager;
  const { params } = req.query;
  var par = JSON.parse(params);
  if (par.UserID != "") {
    where[Op.and] = {
      CreatedUserID: {
        [Op.eq]: par.UserID,
      },
      EstimatedStartDate: {
        [Op.between]: [par.EstimatedStartDate, par.EstimatedEndDate],
      },
    };
  } else {
    where[Op.and] = {
      EstimatedStartDate: {
        [Op.between]: [par.EstimatedStartDate, par.EstimatedEndDate],
      },
    };
  }
  par.OpportunityCloseTypeID != ""
    ? (where[Op.and] = {
        ...where[Op.and],
        OpportunityCloseTypeID: { [Op.eq]: par.OpportunityCloseTypeID },
      })
    : (where[Op.and] = where[Op.and]);

  let rows1 = await users.findAll({
    attributes: ["EmpFirstName"],
    where: {
      IsActive: 1,
    },
    order: [["EmpFirstName", "ASC"]],
    include: [
      {
        attributes: [
          "OpportunityDescription",
          "OpportunityType",
          "ChancesOfSuccess",
          "EstimatedStartDate",
          "EstimatedEndDate",
          "CreatedUserID",
        ],
        model: opportunity,
        as: "opportunity",
        include: [
          {
            attributes: ["ContactName"],
            model: contact,
            as: "contact",
            include: [
              {
                model: legal_entity,
                as: "legal_entity",
              },
              {
                model: company_industry,
                as: "company_industry",
              },
            ],
          },
          {
            model: opportunity_detail,
            as: "opportunity_detail",
            include: [
              {
                model: product,
                as: "product",
                where: {
                  ProductName: {
                    [Op.like]: "%" + par.ProductName + "%",
                  },
                },
              },
            ],
          },
        ],
        where: where,
      },
    ],
  });
  let newData = [];
  let cnt = 0;
  // rows1.forEach((el) => {
  //   if (el.opportunity.length > 0) {
  //     cnt++;
  //   }
  // });
  rows1.forEach((el) => {
    let total = 0;
    let val = 0;
    let newOpp = [];
    el.opportunity.forEach((o) => {
      if (o.opportunity_detail.length > 0) {
        newOpp.push(o.dataValues);
        o.opportunity_detail.forEach((od) => {
          total = total + od.TotalFeeAmount;
          val = val + od.EstimatedValue;
        });
      }
    });
    if (newOpp.length > 0) {
      cnt++;
      newData.push({ ...el.dataValues, total, val });
    }
  });

  const { page } = req.query;

  newData = paginate({
    array: newData,
    page_size: page.size,
    page_number: page.number,
  });

  res.status(200).send({
    success: true,
    data: { data: newData, count: cnt },
  });
});
module.exports.reportByProduct = asyncHandler(async (req, res) => {
  let where = {};
  const pager = req.pager;
  const { params } = req.query;
  var par = JSON.parse(params);
  if (par.UserID != "") {
    where[Op.and] = {
      CreatedUserID: {
        [Op.eq]: par.UserID,
      },
      EstimatedStartDate: {
        [Op.between]: [par.EstimatedStartDate, par.EstimatedEndDate],
      },
    };
  } else {
    where[Op.and] = {
      EstimatedStartDate: {
        [Op.between]: [par.EstimatedStartDate, par.EstimatedEndDate],
      },
    };
  }
  par.OpportunityCloseTypeID != ""
    ? (where[Op.and] = {
        ...where[Op.and],
        OpportunityCloseTypeID: { [Op.eq]: par.OpportunityCloseTypeID },
      })
    : (where[Op.and] = where[Op.and]);
  let rows1 = await product.findAll({
    order: [["ProductName", "ASC"]],
    where: {
      ProductName: {
        [Op.like]: "%" + par.ProductName + "%",
      },
    },
    include: [
      {
        model: opportunity_detail,
        as: "opportunity_detail",
        include: [
          {
            model: opportunity,
            as: "opportunity",
            where: where,
            include: [
              {
                attributes: ["EmpFirstName"],
                model: users,
                as: "users",
              },
              {
                model: contact,
                as: "contact",
                include: [
                  { model: legal_entity, as: "legal_entity" },
                  { model: company_industry, as: "company_industry" },
                ],
              },
            ],
          },
        ],
      },
    ],
  });
  let cnt = 0;

  let newData = [];
  rows1.forEach((el) => {
    let total = 0;
    let val = 0;

    el.opportunity_detail.forEach((od) => {
      total = total + od.TotalFeeAmount;
      val = val + od.EstimatedValue;
    });
    if (el.opportunity_detail.length > 0) {
      newData.push({ ...el.dataValues, total, val });
      cnt++;
    }
  });
  const { page } = req.query;

  newData = paginate({
    array: newData,
    page_size: page.size,
    page_number: page.number,
  });
  res.status(200).send({
    success: true,
    data: { data: newData, count: cnt },
  });
});
module.exports.interactionList = asyncHandler(async (req, res) => {
  let where = {};
  const pager = req.pager;
  const { params } = req.query;
  var par = JSON.parse(params);

  req.LogedUser.RoleID === 2
    ? (where[Op.and] = {
        RelatedUserID: {
          [Op.eq]: req.LogedUser.UserID,
        },
        InteractionDate: {
          [Op.between]: [par.EstimatedStartDate, par.EstimatedEndDate],
        },
      })
    : par.UserID != ""
    ? (where[Op.and] = {
        RelatedUserID: {
          [Op.eq]: par.UserID,
        },
        InteractionDate: {
          [Op.between]: [par.EstimatedStartDate, par.EstimatedEndDate],
        },
      })
    : (where[Op.and] = {
        InteractionDate: {
          [Op.between]: [par.EstimatedStartDate, par.EstimatedEndDate],
        },
      });

  let rows1 = await contact.findAll({
    attributes: ["ContactID", "CreatedDate", "LegalEntityID"],
    where: {
      ContactName: {
        [Op.like]: "%" + par.ContactName + "%",
      },
    },
    order: [["CreatedDate", "DESC"]],
    include: [
      {
        model: legal_entity,
        as: "legal_entity",
      },
      {
        model: company_industry,
        as: "company_industry",
      },
      {
        attributes: [
          "OpportunityDescription",
          "OpportunityType",
          "ChancesOfSuccess",
          "EstimatedStartDate",
          "EstimatedEndDate",
          "CreatedUserID",
        ],
        model: opportunity,
        as: "opportunity",
        include: [
          {
            model: interaction,
            as: "interaction",
            include: [
              { model: interaction_type, as: "interaction_type" },
              {
                model: users,
                as: "users",
              },
            ],
            where: where,
          },
        ],
      },
    ],
  });

  let cnt = 0;

  // rows1.forEach((el) => {
  //   if (el.opportunity.length > 0) {
  //     cnt++;
  //   }
  // });
  let newRows = [];
  let tval = 0;
  let tfee = 0;
  rows1.forEach((item, index) => {
    let cntOpp = 0;
    let val = 0;
    let fee = 0;

    let newOpp = [];
    item.opportunity.forEach((dt, index) => {
      let cntDt = 0;
      cntDt = dt.interaction.length;
      let t = dt.dataValues;
      cntOpp = cntOpp + cntDt;
      newOpp.push({ ...t, cntDt });
    });

    let tmp = newOpp;
    if (tmp.length > 0) {
      newRows.push({ ...item.dataValues, opportunity: tmp, cntOpp });
      cnt++;
    }
  });
  const { page } = req.query;

  newRows = paginate({
    array: newRows,
    page_size: page.size,
    page_number: page.number,
  });
  res.status(200).send({
    success: true,
    data: { data: newRows, count: cnt },
  });
});
module.exports.trainingList = asyncHandler(async (req, res) => {
  let where = {};
  const pager = req.pager;
  const { params } = req.query;
  var par = JSON.parse(params);

  where[Op.and] = {
    InteractionDate: {
      [Op.between]: [par.EstimatedStartDate, par.EstimatedEndDate],
    },
    InteractionTypeID: {
      [Op.eq]: 5,
    },
  };

  let rows1 = await contact.findAll({
    attributes: ["ContactID", "CreatedDate", "LegalEntityID"],
    where: {
      ContactName: {
        [Op.like]: "%" + par.ContactName + "%",
      },
    },
    order: [["CreatedDate", "DESC"]],
    include: [
      {
        model: legal_entity,
        as: "legal_entity",
      },

      {
        attributes: [
          "OpportunityDescription",
          "OpportunityType",
          "ChancesOfSuccess",
          "EstimatedStartDate",
          "EstimatedEndDate",
          "CreatedUserID",
        ],
        model: opportunity,
        as: "opportunity",
        include: [
          {
            model: interaction,
            as: "interaction",
            include: [
              { model: interaction_type, as: "interaction_type" },
              {
                model: users,
                as: "users",
              },
            ],
            where: where,
          },
        ],
      },
    ],
  });

  let cnt = 0;

  let newRows = [];

  rows1.forEach((item, index) => {
    let cntOpp = 0;

    let newOpp = [];
    item.opportunity.forEach((dt, index) => {
      let cntDt = 0;
      cntDt = dt.interaction.length;
      let t = dt.dataValues;
      cntOpp = cntOpp + cntDt;
      newOpp.push({ ...t, cntDt });
    });

    let tmp = newOpp;
    if (tmp.length > 0) {
      newRows.push({ ...item.dataValues, opportunity: tmp, cntOpp });
      cnt++;
    }
  });
  const { page } = req.query;

  newRows = paginate({
    array: newRows,
    page_size: page.size,
    page_number: page.number,
  });
  res.status(200).send({
    success: true,
    data: { data: newRows, count: cnt },
  });
});

module.exports.create = asyncHandler(async (req, res) => {
  let createData = req.body;

  const CreatedUserID = req.LogedUser.UserID;
  createData = { ...createData, CreatedUserID };
  const data = await opportunity.create({
    ...createData,
    OpportunityCloseTypeID: 0,
  });

  if (data.OpportunityID) {
    const ownercreateData = {
      OpportunityID: data.OpportunityID,
      CreatedUserID: data.CreatedUserID,
      UserPercent: 100,
      UserID: data.CreatedUserID,
    };
    const ownerdata = await opportunity_owner.create(ownercreateData);
  }

  res.status(200).send({
    success: true,
    data: data,
  });
});

module.exports.show = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const data = await opportunity.findByPk(id, {
    // attributes: ["CreatedDate"],
    include: [
      {
        model: opportunity_owner,
        as: "opportunity_owner",
      },
      {
        attributes: ["ContactName"],
        model: contact,
        as: "contact",
        where: {
          ContactID: {
            [Op.not]: null,
          },
        },
        include: [
          {
            attributes: ["LegalEntityRegisterNo"],
            model: legal_entity,
            as: "legal_entity",
          },
        ],
      },

      // {
      //   attributes: ["TotalFeeAmount"],
      //   model: opportunity_detail,
      //   as: "opportunity_detail",
      // },

      { attributes: ["EmpFirstName"], model: users, as: "users" },
    ],
  });

  res.status(200).send({
    success: true,
    data: data,
  });
});
module.exports.singledata = asyncHandler(async (req, res) => {
  const { id } = req.body;

  const data = await legal_entity.findOne({
    where: {
      LegalEntityRegisterNo: {
        [Op.eq]: id,
      },
    },
    include: [
      {
        model: contact,
        as: "contact",
      },
    ],
  });

  if (data && data.contact.length > 0) {
    res.status(200).send({
      success: true,
      data: data,
    });
  } else {
    res.status(200).send({
      success: false,
      data: null,
      error: [{ msg: "Харилцагч олдсонгүй" }],
    });
  }
});

module.exports.singledataCreate = asyncHandler(async (req, res) => {
  const { id, Type } = req.body;

  const data = await legal_entity.findOne({
    where: {
      LegalEntityRegisterNo: {
        [Op.eq]: id,
      },
    },
    include: [
      {
        model: contact,
        as: "contact",
      },
    ],
  });

  if (data) {
    if (Type === "Байгууллага") {
      if (data.contact.length > 0) {
        res.status(200).send({
          success: false,
          data: null,
          error: [
            {
              msg: data.LegalEntityName + " Байгууллага бүртгэлтэй байна",
            },
          ],
        });
      } else {
        res.status(200).send({
          success: true,
          data: data,
        });
      }
    } else {
      res.status(200).send({
        success: true,
        data: data,
      });
    }
  } else {
    res.status(200).send({
      success: false,
      data: null,
      error: [{ msg: "Байгууллага олдсонгүй" }],
    });
  }
});

module.exports.getInteraction = asyncHandler(async (req, res) => {
  const { id } = req.body;

  const { rows, count } = await interaction.findAndCountAll({
    where: {
      OpportunityID: id,
    },
    include: [],
    ...pager,
  });

  res.status(200).send({
    success: true,
    data: { data: rows, count: count },
  });
});

module.exports.update = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  console.log({ updateData });

  const rows = await opportunity_close_type.findOne({
    where: {
      OpportunityCloseTypeID: updateData.OpportunityCloseTypeID,
    },
  });

  const OpportunityStatus = rows.Description;

  const data = await opportunity.update(
    { ...updateData, OpportunityStatus },
    {
      where: {
        OpportunityID: id,
      },
    }
  );

  res.status(200).send({
    success: true,
    data: data,
  });
});

module.exports.destroy = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const data = await opportunity.destroy({
    where: {
      OpportunityID: id,
    },
  });

  res.status(200).send({
    success: true,
    data: data,
  });
});
