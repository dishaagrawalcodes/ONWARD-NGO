const express = require("express");
const router = express.Router();

const {
  createDonation,
  getAllDonations,
  createOrder,
  verifyPayment,
} = require("../controllers/donationController");

const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, createDonation);
router.get("/", getAllDonations);

router.post("/create-order", authMiddleware, createOrder);
router.post("/verify-payment", authMiddleware, verifyPayment);

module.exports = router;