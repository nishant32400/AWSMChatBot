import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);


  useEffect(() => {
    axios.get("http://localhost:5000/api/chat/history")
      .then(res => {
        const formatted = res.data.map(msg => ({
          sender: msg.role,
          text: msg.content
        }));
        setMessages(formatted);
      })
      .catch(err => console.error("Error loading history:", err));
  }, []);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);
    setInput("");
    setIsTyping(true); // Typing starts

    try {
      const response = await axios.post("http://localhost:5000/api/chat", {
        message: input,
      });

      setMessages([
        ...newMessages,
        { sender: "bot", text: response.data.reply },
      ]);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages([
        ...newMessages,
        { sender: "bot", text: "Sorry, something went wrong." },
      ]);
    }

    setIsTyping(false); // Typing ends
  };

  return (
    <div className="app">
      <h1>AI Customer Support Chatbot</h1>
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.sender === "user" ? "user" : "bot"}`}
          >
            <span>{msg.text}</span>
          </div>
        ))}
        {isTyping && <div className="message bot"><i>Bot is typing...</i></div>}
      </div>

      <div className="input-area">
        <input
          type="text"
          placeholder="Ask something..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default App;
