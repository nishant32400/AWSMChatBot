require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const chatRoutes = require("./routes/chatRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/chat", chatRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");

    // Start the server **after** DB is connected
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
