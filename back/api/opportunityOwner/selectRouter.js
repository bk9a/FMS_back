const router = require("express").Router();
const Auth = require("../../middleware/Auth");

const { getSelectUsers } = require("./controller");

router.route("/").get(Auth.protect, getSelectUsers);

module.exports = router;
