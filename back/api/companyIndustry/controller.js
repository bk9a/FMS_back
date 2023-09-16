const asyncHandler = require("express-async-handler");
const { Op, company_industry } = require("../../model");

module.exports.list = asyncHandler(async (req, res) => {
  const { page, params } = req.query;
  var par = params ? JSON.parse(params) : {};
  const where = {};
  if (par) {
    where[Op.and] = [
      {
        Description: {
          [Op.like]: "%" + par.Description + "%",
        },
        IsActive: {
          [Op.eq]: par.IsActive,
        },
      },
    ];
  }
  const pager = req.pager;
  const { rows, count } = await company_industry.findAndCountAll({
    where: where,
    include: [],
    ...pager,
  });

  res.status(200).send({
    success: true,
    data: { data: rows, count: count },
  });
});

module.exports.listSelect = asyncHandler(async (req, res) => {
  const data = await company_industry.findAll({});

  res.status(200).send({
    success: true,
    data: { data },
  });
});

module.exports.create = asyncHandler(async (req, res) => {
  const createData = req.body;
  const data = await company_industry.create(createData);

  res.status(200).send({
    success: true,
    data: data,
  });
});

module.exports.show = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const data = await company_industry.findByPk(id, {});

  res.status(200).send({
    success: true,
    data: data,
  });
});

module.exports.update = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  const data = await company_industry.update(updateData, {
    where: {
      CompanyIndustryID: id,
    },
  });
  res.status(200).send({
    success: true,
    data: data,
  });
});

module.exports.destroy = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const data = await company_industry.destroy({
    where: {
      CompanyIndustryID: id,
    },
  });

  res.status(200).send({
    success: true,
    data: data,
  });
});
