// backend/server.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const path = require("path");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// ✅ Show message on root URL
app.get("/", (req, res) => {
  res.send("✅ Welcome to the HouseHub Backend API!");
});

// API routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/addprofileusers", require("./routes/addProfileRoutes"));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/homeowners", require("./routes/homeowners"));
app.use("/api/contractors", require("./routes/contractorRoutes"));
app.use("/api/properties", require("./routes/property"));
app.use("/api/auth", require("./routes/userauth")); // <-- ADD THIS LINE
app.use("/api/maintenance", require("./routes/maintenance"));
app.use("/api/appliances", require("./routes/appliances"));
app.use("/api/packages", require("./routes/packageRoutes"));

connectDB().then(() => {
  app.listen(5000, () =>
    console.log("🚀 Server running on http://localhost:5000")
  );
});