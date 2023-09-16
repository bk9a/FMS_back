const asyncHandler = require("express-async-handler");
const { Op, contact, legal_entity } = require("../../model");

module.exports.list = asyncHandler(async (req, res) => {
  const { page, params } = req.query;
  var par = JSON.parse(params);

  console.log({ par });
  // var WorkLegalEntityID =
  //   par.WorkLegalEntityID.length > 0
  //     ? "%" + par.WorkLegalEntityID + "%"
  //     : "% %";
  const where = {};
  if (par) {
    where[Op.and] = [
      {
        ContactName: {
          [Op.like]: "%" + par.ContactName + "%",
        },
        Type: {
          [Op.like]: "%" + par.Type + "%",
        },
        // WorkLegalEntityID: {
        //   [Op.like]: WorkLegalEntityID,
        // },
        Phone: {
          [Op.like]: "%" + par.Phone + "%",
        },
        URL: {
          [Op.like]: "%" + par.URL + "%",
        },
        Address: {
          [Op.like]: "%" + par.Address + "%",
        },
        ContactNote: {
          [Op.like]: "%" + par.ContactNote + "%",
        },
      },
    ];
  }

  // let logged = req.LogedUser;
  let incWhere = {};
  // if (logged.RoleID == 2) {
  //   incWhere = {
  //     UserID: {
  //       [Op.eq]: logged.UserID,
  //     },
  //   };
  // } else {
  incWhere = {
    LegalEntityRegisterNo: {
      [Op.like]: "%" + par["legal_entity.LegalEntityRegisterNo"] + "%",
    },
  };
  // }
  const pager = req.pager;
  const { rows, count } = await contact.findAndCountAll({
    where: where,
    order: [["CreatedDate", "DESC"]],
    include: [
      {
        attributes: ["LegalEntityRegisterNo"],
        model: legal_entity,
        as: "legal_entity",
        where: incWhere,
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
  var createData = req.body;
  const LegalEntityName = req.body.ContactName;
  const LegalEntityRegisterNo =
    req.body.LegalEntityRegisterNo === ""
      ? req.body["legal_entity.LegalEntityRegisterNo"]
      : req.body.LegalEntityRegisterNo;
  // let legalEntity = null;

  // console.log({ createData });
  // legalEntity = await legal_entity.create({
  //   LegalEntityName,
  //   LegalEntityRegisterNo,
  //   SourceType: 1,
  //   UserID: 1,
  // });
  // createData = {
  //   ...createData,
  //   LegalEntityID: legalEntity.dataValues.LegalEntityId,
  // };

  const lfu = {};
  lfu[Op.and] = [
    {
      LegalEntityRegisterNo: {
        [Op.eq]: LegalEntityRegisterNo,
      },
    },
  ];

  const [legalEntity, created] = await legal_entity.findOrCreate({
    where: lfu,
    defaults: {
      LegalEntityName,
      LegalEntityRegisterNo,
      SourceType: 1,
      UserID: 1,
    },
  });
  if (created) {
    createData = {
      ...createData,
      LegalEntityID: legalEntity.dataValues.LegalEntityId,
    };
    const data = await contact.create(createData);
    res.status(200).send({
      success: true,
      data: data,
    });
  } else {
    const data1 = await contact.findOne({
      where: {
        LegalEntityId: legalEntity.dataValues.LegalEntityId,
      },
    });

    console.log({ data1 });

    if (data1) {
      res.status(200).send({
        success: false,
        data: null,
        error: [{ msg: "Харилцагч бүртгэлтэй байна!!!" }],
      });
    } else {
      console.log({ createData });
      createData = {
        ...createData,
        // LegalEntityID: legalEntity.dataValues.LegalEntityId,
      };

      console.log({ createData });
      const data = await contact.create(createData);
      res.status(200).send({
        success: true,
        data: data,
      });
    }
  }
});

module.exports.show = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const data = await contact.findByPk(id, {});

  res.status(200).send({
    success: true,
    data: data,
  });
});

module.exports.update = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  console.log({ updateData });
  let { Phone, Email, URL, Address, CompanyIndustryID, ContactNote } =
    updateData;
  console.log({ Phone, Email, URL, Address, CompanyIndustryID, ContactNote });
  const data = await contact.update(
    { Phone, Email, URL, Address, CompanyIndustryID, ContactNote },
    {
      where: {
        ContactID: id,
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
  const data = await contact.destroy({
    where: {
      ContactID: id,
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
