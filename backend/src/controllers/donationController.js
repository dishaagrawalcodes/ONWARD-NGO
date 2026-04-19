const prisma = require("../config/prismaClient");

exports.createDonation = async (req, res) => {
  try {
    const { amount } = req.body;
    const userId = req.user.id;

    const donation = await prisma.donation.create({
      data: {
        amount,
        userId,
      },
    });

    res.json(donation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllDonations = async (req, res) => {
  try {
    const donations = await prisma.donation.findMany({
      include: { user: true },
    });

    res.json(donations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const Razorpay = require("razorpay");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

exports.createOrder = async (req, res) => {
  const { amount } = req.body;

  const options = {
    amount: amount * 100, // paise
    currency: "INR",
  };

  const order = await razorpay.orders.create(options);

  res.json(order);
};
const crypto = require("crypto");

exports.verifyPayment = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest("hex");

  if (expectedSignature === razorpay_signature) {
    // ✅ Save donation
    await prisma.donation.create({
      data: {
        amount: req.body.amount,
        userId: req.user.id,
      },
    });

    res.json({ message: "Payment verified" });
  } else {
    res.status(400).json({ message: "Invalid signature" });
  }
};