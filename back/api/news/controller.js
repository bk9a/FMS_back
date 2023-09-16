const asyncHandler = require("express-async-handler");
const { news, news_type, news_file, Op, sequelize } = require("../../model");
const formidable = require("formidable");
const path = require("path");
const fs = require("fs");
const moment = require("moment");
const shortid = require("shortid");

module.exports.list = asyncHandler(async (req, res) => {
  const { filter, page } = req.query;

  const where = {};

  if (filter && filter.title) {
    where.title = { [Op.like]: `%${filter.title}%` };
  }

  if (filter && filter.id) {
    where.id = filter.id;
  }
  if (filter && filter.news_type_id) {
    where.news_type_id = filter.news_type_id;
  }

  const pager = { limit: 5, offset: 1 };
  if (page && page.number && page.size) {
    pager.limit = parseInt(page.size + "");
    pager.offset = parseInt(page.size + "") * (parseInt(page.number + "") - 1);
  }

  // const [data] = await sequelize.query(
  //   `select * from news where title like '%${filter.title}%'`
  // );

  const counts = await news.count({
    where: where,
    include: [
      {
        attributes: ["name"],
        model: news_type,
        as: "news_type",
      },
    ],
    pager,
  });

  var data = await news.findAll({
    attributes: ["id", "title", "date", "content"],
    where: where,
    include: [
      {
        model: news_file,
        as: "images",
        //where: { type: "news" },
      },
      {
        attributes: ["name"],
        model: news_type,
        as: "news_type",
      },
    ],
    ...pager,
    order: [["id", "DESC"]],
  });

  //data = JSON.parse(JSON.stringify(data));

  // for (let i = 0; i < data.length; i++) {
  //   console.log(data[i]);
  //   data[i].dataValues.images = await data[i].getImages();
  // }

  res.status(200).send({
    success: true,
    data: { data, count: counts },
  });
});

module.exports.create = asyncHandler(async (req, res) => {
  const { content, title, date, news_type_id, news_file_id } = req.body;

  console.log({ content, title, date, news_type_id, news_file_id });
  // if (!title) {
  //   throw new Error("гарчиг хоосон");
  // }

  const data = await news.create({ content, title, date, news_type_id });

  const upd = await news_file.update(
    {
      news_id: data.id,
    },
    { where: { id: { [Op.in]: news_file_id } } }
  );

  // const nullphotos = await news_file.findAll({
  //   attributes: ["name", "ext"],
  //   where: {
  //     news_id: null,
  //   },
  // });

  // for (let i = 0; i < nullphotos.length; i++) {
  //   const deletePath =
  //     "C:\\Users\\ITS\\Documents\\GitHub\\BaseBackEndNode\\public\\images\\news\\" +
  //     nullphotos[i].name +
  //     "." +
  //     nullphotos[i].ext;
  //   try {
  //     fs.unlinkSync(deletePath);
  //     //file removed
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }

  // const del = await news_file.destroy({
  //   where: {
  //     news_id: null,
  //   },
  // });

  res.status(200).send({
    success: true,
    data: data,
  });
});

module.exports.show = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const data = await news.findByPk(id, {
    include: [
      {
        model: news_file,
        as: "images",
      },
      {
        attributes: ["name"],
        model: news_type,
        as: "news_type",
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
  console.log(req.body);
  const {
    content,
    title,
    date,
    news_type_id,
    news_file_id,
    deleteidss,
    deleteimage,
  } = req.body;
  const updateData = {};

  if (content !== undefined) {
    updateData.content = content;
  }
  if (title !== undefined) {
    updateData.title = title;
  }
  if (date !== undefined) {
    updateData.date = date;
  }
  if (news_type_id !== undefined) {
    updateData.news_type_id = news_type_id;
  }

  const data = await news.update(updateData, {
    where: {
      id,
    },
  });

  for (let i = 0; i < deleteimage.length; i++) {
    const deletePath =
      "C:\\Users\\ITS\\Documents\\GitHub\\BaseBackEndNode\\public\\images\\news\\" +
      deleteimage[i];
    try {
      fs.unlinkSync(deletePath);
      //file removed
    } catch (err) {
      console.error(err);
    }
  }

  const del = await news_file.destroy({
    where: {
      id: deleteidss,
    },
  });

  const upd = await news_file.update(
    {
      news_id: id,
    },
    { where: { id: { [Op.in]: news_file_id } } }
  );

  res.status(200).send({
    success: true,
    data: data,
  });
});

module.exports.destroy = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const nullphotos = await news_file.findAll({
    attributes: ["name", "ext"],
    where: {
      news_id: id,
    },
  });

  for (let i = 0; i < nullphotos.length; i++) {
    const deletePath =
      "C:\\Users\\ITS\\Documents\\GitHub\\BaseBackEndNode\\public\\images\\news\\" +
      nullphotos[i].name +
      "." +
      nullphotos[i].ext;
    try {
      fs.unlinkSync(deletePath);
      //file removed
    } catch (err) {
      console.error(err);
    }
  }
  const upd = await news_file.destroy({
    where: {
      news_id: id,
    },
  });
  const data = await news.destroy({
    where: {
      id,
    },
  });

  res.status(200).send({
    success: true,
    data: data,
  });
});

module.exports.uploadFile = asyncHandler(async (req, res) => {
  var form = new formidable.IncomingForm();
  form.maxFileSize = 3000 * 1024 * 1024;

  form.parse(req, async (err, Fields, Files) => {
    console.log({ Fields, Files });
    if (Files) {
      const ids = [];
      for (let i = 0; i < Object.keys(Files).length; i++) {
        const NewFile = Files["myFile" + i];
        const ext = NewFile.name.split(".")[NewFile.name.split(".").length - 1];
        const newName = shortid.generate();
        const uploadFolder =
          "C:\\Users\\ITS\\Documents\\GitHub\\BaseBackEndNode\\public\\images\\news\\";

        fs.rename(
          NewFile.path,
          uploadFolder + newName + "." + ext,
          function (error) {
            if (error) throw error;
          }
        );
        const newFile = await news_file.create({
          orgname: NewFile.name,
          name: newName,
          ext,
        });

        ids.push(newFile.id);
      }
      res.status(200).send({
        success: true,
        data: { ids },
      });
      // moment().format("YYMMDDHHmmss");
    }
  });
});
