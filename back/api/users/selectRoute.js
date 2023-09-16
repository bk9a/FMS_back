const router = require("express").Router();
const Auth = require("../../middleware/Auth");

const { selectlist } = require("./controller");

router.route("/").get(Auth.protect, selectlist);

module.exports = router;
