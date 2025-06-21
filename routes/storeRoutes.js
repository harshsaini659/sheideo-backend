const express = require("express");
const router = express.Router();
const { createStore } = require("../controllers/storeController");
const { isSeller } = require("../middlewares/authMiddleware");


router.post("/store", isSeller, createStore);

module.exports = router;
