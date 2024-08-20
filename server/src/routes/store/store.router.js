const express = require("express");
const {
  getStore,
  searchStoreItem,
  updateStore,
  createStoreItem,
  removeStoreItem,
  getStatus,
} = require("./store.controller");
const { isAuthorized, isChecked } = require("../../middleware/auth");
const router = express.Router();

router.get("/status", isChecked, isAuthorized("1101,1100"), getStatus); //http://localhost:5000/vs/status
router.get("/search", isAuthorized("1101,1100"), getStore); //http://localhost:5000/api/search?loc=all
router.get("/item/", isAuthorized("1101,1100"), searchStoreItem); //http://localhost:5000/api/item?search=S1
router.post("/create", isAuthorized("1101"), createStoreItem);
router.patch("/update", isAuthorized("1101"), updateStore);
router.delete("/delete", isAuthorized("1101"), removeStoreItem);
module.exports = router;
