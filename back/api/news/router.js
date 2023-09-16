const router = require("express").Router();
//const Auth = require("../middleware/Auth");
const {
  list,
  create,
  show,
  update,
  destroy,

  uploadFile,
} = require("./controller");

router.route("/").get(list).post(create);

router.route("/:id").get(show).put(update).delete(destroy);

router.route("/upload-file").post(uploadFile);

module.exports = router;
