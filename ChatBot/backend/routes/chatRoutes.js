// backend/routes/chatRoutes.js
const express = require("express");
const router = express.Router();
const { chatWithBot, getChatHistory } = require("../controllers/chatController");

router.post("/", chatWithBot);
router.get("/history", getChatHistory);
module.exports = router;
