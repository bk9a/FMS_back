const router = require("express").Router();

router.use("/news", require("./news/router"));
router.use("/users", require("./users/router"));
// router.use("/test", require("./users/router"));
router.use("/users-role", require("./users_role/router"));
router.use("/company-industry", require("./companyIndustry/router"));
router.use("/employee-position", require("./employeePosition/router"));
router.use("/interaction-type", require("./interactionType/router"));
router.use("/challenger-company", require("./challengerCompany/router"));

router.use("/product-risk", require("./riskList/router"));
router.use("/product-risk-detail", require("./riskListDetail/router"));
router.use("/product", require("./product/router"));
router.use("/legal-entity", require("./legalEntity/router"));
router.use("/contact", require("./contact/router"));
router.use("/employee", require("./employee/router"));

router.use(
  "/opportunity-lost-reason",
  require("./opportunityLostReason/router")
);
router.use("/opportunity-type", require("./opportunity_type/router"));
router.use(
  "/opportunity-close-type",
  require("./opportunity_close_type/router")
);
router.use("/news_type", require("./news_type/router"));

// pre

router.use("/legal-entity", require("./legalEntity/router"));
router.use("/contact", require("./contact/router"));
router.use("/sales-plan", require("./salesPlan/router"));
router.use("/opportunity", require("./opportunity/router"));
router.use("/interaction", require("./interaction/router"));

router.use("/opportunity-owner", require("./opportunityOwner/router"));

router.use("/opportunity-detail", require("./opportunity_detail/router"));

router.use("/select-user", require("./users/selectRoute"));
router.use("/select-challenger", require("./challengerCompany/selectRoute"));
router.use("/select-reason", require("./opportunityLostReason/selectRoute"));
router.use("/select-risk", require("./riskList/routerSelect"));
router.use("/select-user-v1", require("./users/selectRoutev1"));
router.use("/select-interaction", require("./interactionType/selectrouter"));
router.use(
  "/select-interaction-user",
  require("./opportunityOwner/selectRouter")
);
router.use("/product-pdetail", require("./product/selectRoute"));
router.use(
  "/product-package-service",
  require("./product_package_service/router")
);
module.exports = router;
