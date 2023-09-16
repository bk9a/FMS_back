const router = require("express").Router();
const Auth = require("../../middleware/Auth");
const middleWare = require("./middleWare");
const validation = require("./validation");
const { listAll } = require("./controller");

router.route("/").get(Auth.protect, listAll);

module.exports = router;
