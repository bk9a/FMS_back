const router = require("express").Router();
const validation = require("./validation");
//const Auth = require("../middleware/Auth");
const { list, create, show, update, destroy } = require("./controller");

router.route("/").get(list).post(validation.create, create);

router.route("/:id").get(show).put(update).delete(destroy);

module.exports = router;
