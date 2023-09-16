const { news_file, Op } = require("../model");
var moment = require("moment"); // require
var fs = require("fs");
const FileDeleteSchedule = async () => {
  var d1 = moment();

  d1 = d1.subtract(1, "hours");

  const nullphotos = await news_file.findAll({
    attributes: ["name", "ext", "create_date"],
    where: {
      news_id: null,
      create_date: { [Op.lt]: d1 },
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
  const del = await news_file.destroy({
    where: {
      news_id: null,
      create_date: { [Op.lt]: d1 },
    },
  });
};
module.exports = FileDeleteSchedule;
