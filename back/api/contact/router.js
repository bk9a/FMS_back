const router = require("express").Router();
const Auth = require("../../middleware/Auth");
const middleWare = require("./middleWare");
const validation = require("./validation");
const {
  list,
  create,
  show,
  update,
  destroy,
  checklogin,
} = require("./controller");

router
  .route("/")
  .get(Auth.protect, middleWare.list, list)
  .post(Auth.protect, create);

router
  .route("/:id")
  .get(Auth.protect, show)
  .put(Auth.protect, update)
  .delete(Auth.protect, destroy);

router.route("/get-user-data").post(Auth.protect, checklogin);

module.exports = router;
