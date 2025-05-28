
const OpenAI = require("openai");
const Message = require("../models/Message");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const chatWithBot = async (req, res) => {
  const { message } = req.body;

  try {
    //
    // await Message.create({ role: "user", content: message });

    // 
    // const completion = await openai.chat.completions.create({
    //   model: "gpt-3.5-turbo",
    //   messages: [{ role: "user", content: message }],
    // });

    // const botReply = completion.choices[0].message.content;

   
    const botReply = "This is a mock reply. Please configure your OpenAI billing.";
    await Message.create({ role: "user", content: message });
    await Message.create({ role: "bot", content: botReply });

    res.json({ reply: botReply });
  } catch (err) {
    // console.error("Error in OpenAI chat:", err);
    console.error("Mock error:",err)
    res.status(500).json({ error: "Something went wrong" });
  }
};

const getChatHistory = async (req, res) => {
  try {
    const messages = await Message.find().sort({ timestamp: 1 });
    res.json(messages);
  } catch (error) {
    console.error("Error fetching chat history:", error);
    res.status(500).json({ error: "Failed to fetch chat history" });
  }
};

module.exports = { chatWithBot, getChatHistory };
