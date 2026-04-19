require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

// Routes
app.use("/api/auth", require("./src/routes/authRoutes"));
app.use("/api/donations", require("./src/routes/donationRoutes"));
app.use("/api/volunteer", require("./src/routes/volunteerRoutes"));
app.use("/api/contact", require("./src/routes/contactRoutes"));

app.get("/", (req, res) => {
  res.send("NGO Backend Running 🚀");
});

const PORT = process.env.PORT || 5100;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});