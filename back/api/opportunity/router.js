const router = require("express").Router();
const Auth = require("../../middleware/Auth");
const middleWare = require("./middleWare");
const validation = require("./validation");
const valid = require("./valid");
const {
  list,
  create,
  show,
  update,
  destroy,
  singledata,
  getInteraction,
  reportlist,
  interactionList,
  singledataCreate,
  reportByManager,
  reportByProduct,
  trainingList,
  totalInteraction,
  totalStatus,
  performancelist,
  dashboardData,
} = require("./controller");

router
  .route("/total-interaction")
  .get(Auth.protect, middleWare.list, totalInteraction);
router.route("/total-status").get(Auth.protect, middleWare.list, totalStatus);
router
  .route("/performance-summary")
  .get(Auth.protect, middleWare.list, performancelist);
router.route("/report").get(Auth.protect, middleWare.list, reportlist);
router.route("/dash-data").get(Auth.protect, middleWare.list, dashboardData);

router.route("/by-manager").get(Auth.protect, middleWare.list, reportByManager);
router.route("/by-product").get(Auth.protect, middleWare.list, reportByProduct);
router
  .route("/training-report")
  .get(Auth.protect, middleWare.list, trainingList);
router
  .route("/rep-interaction")
  .get(Auth.protect, middleWare.list, interactionList);

router
  .route("/")
  .get(Auth.protect, middleWare.list, list)
  .post(Auth.protect, validation.create, create);

router
  .route("/:id")
  .get(Auth.protect, show)
  .put(Auth.protect, update)
  .delete(Auth.protect, destroy);

router.route("/company").post(Auth.protect, singledata);
router.route("/create-company").post(Auth.protect, singledataCreate);
router.route("/interaction").post(Auth.protect, getInteraction);

module.exports = router;
