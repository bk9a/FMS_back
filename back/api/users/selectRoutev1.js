const router = require("express").Router();
const Auth = require("../../middleware/Auth");

const { selectlistv1 } = require("./controller");

router.route("/").get(Auth.protect, selectlistv1);

module.exports = router;
