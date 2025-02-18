const express = require("express");
const router = express.Router();
const { createOrder, getOrders, getOrderById } = require("../controllers/requestsController");

router.post("/", createOrder);
router.get("/", getOrders);
router.get("/:id", getOrderById);

module.exports = router;
