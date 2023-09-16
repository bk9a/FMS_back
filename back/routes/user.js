const express = require("express");
const UserController = require("../controllers/UserController");
const Auth = require("../middleware/Auth");
var router = express.Router();

router.post("/login", UserController.Login);
router.post("/register", UserController.Register);
router.post("/check-login", Auth.protect, UserController.CheckLogin);

module.exports = router;
