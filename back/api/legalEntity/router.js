const router = require("express").Router();
const Auth = require("../../middleware/Auth");
const middleWare = require("./middleWare");
const validation = require("./validation");
const { list, create, show, update, destroy } = require("./controller");

router
  .route("/")
  .get(Auth.protect, middleWare.list, list)
  .post(Auth.protect, validation.create, create);

router
  .route("/:id")
  .get(Auth.protect, show)
  .put(Auth.protect, update)
  .delete(Auth.protect, destroy);

module.exports = router;
