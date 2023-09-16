const express = require("express");
const Auth = require("../middleware/Auth");
const {
  GetList,
  Create,
  GetDetail,
  Update,
  Delete,
  GetAdvanceDetail,
} = require("../controllers/BaseCrudController");
var router = express.Router();
router.route("/:ObjectName/get-detail").get(GetAdvanceDetail);
router.route("/:ObjectName").get(GetList).post(Auth.protect, Create);
router
  .route("/:ObjectName/:Id")
  .get(GetDetail)
  .put(Auth.protect, Update)
  .delete(Auth.protect, Delete);

module.exports = router;
