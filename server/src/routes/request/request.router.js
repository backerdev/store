const express = require("express");
const {
  SendrequestItem,
  GetrequestItem,
  updaterequestItem,
  DeleterequestItem,
} = require("./request.controller");
const { isAuthorized } = require("../../middleware/auth");

const router = express.Router();

router.post("/pending", isAuthorized(1110), SendrequestItem);
router.post("/", SendrequestItem);
router.get("/", GetrequestItem);
router.patch("/", updaterequestItem);
router.delete("/", DeleterequestItem);

module.exports = router;
