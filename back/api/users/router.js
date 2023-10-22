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
  login,
  checklogin,
  // convert,
  test,
  test1,
  deletetest,
  getNoti,
} = require("./controller");

// router.route("/").get(test).post(test1).delete(deletetest);
router.route("/get-noti").get(Auth.protect, getNoti);
// router.route("/convert").get(Auth.protect, convert);
router
  .route("/")
  .get(Auth.protect, middleWare.list, list)
  .post(Auth.protect, validation.create, create);

router
  .route("/:id")
  .get(Auth.protect, show)
  .put(Auth.protect, update)
  .delete(Auth.protect, destroy);

router.route("/login").post(login);

router.route("/get-user-data").post(Auth.protect, checklogin);

module.exports = router;
