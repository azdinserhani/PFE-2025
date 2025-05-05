import React, { useState, useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";
import { FaRobot, FaUser } from "react-icons/fa";
import Together from "together-ai";

const AIChat = () => {
  const [messages, setMessages] = useState(() => {
    const storedMessages = localStorage.getItem("aiChatMessages");
    return storedMessages ? JSON.parse(storedMessages) : [];
  });
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { currentTheme, themes } = useTheme();
  const theme = themes[currentTheme];

  const together = new Together({
    apiKey: import.meta.env.VITE_API_KEY,
  });

  // Load messages from localStorage
  useEffect(() => {
    const storedMessages = localStorage.getItem("aiChatMessages");
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    }
  }, []);

  // Save messages to localStorage
  useEffect(() => {
    localStorage.setItem("aiChatMessages", JSON.stringify(messages));
  }, [messages]);

  const handleSendMessage = async () => {
    if (inputMessage.trim()) {
      const newMessage = {
        id: Date.now(),
        text: inputMessage,
        sender: "user",
      };
      setMessages((prev) => [...prev, newMessage]);
      setInputMessage("");
      setIsLoading(true);

      try {
        const completion = await together.chat.completions.create({
          model: "meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo",
          messages: [{ role: "user", content: inputMessage }],
        });

        const aiResponse = {
          id: Date.now() + 1,
          text: completion.choices[0].message.content,
          sender: "ai",
        };

        setTimeout(() => {
          setMessages((prev) => [...prev, aiResponse]);
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error("AI response error:", error);
        setIsLoading(false);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div
        className="flex-1 overflow-y-auto p-4 mb-4 rounded-lg"
        style={{ backgroundColor: `${theme.primary}10` }}
      >
        {messages.length === 0 ? (
          <div
            className="text-center text-sm"
            style={{ color: theme.secondary }}
          >
            Ask me anything about this course!
          </div>
        ) : (
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`flex items-start gap-3 mb-4 ${
                  message.sender === "user" ? "flex-row-reverse" : ""
                }`}
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{
                    backgroundColor:
                      message.sender === "ai"
                        ? `${theme.primary}20`
                        : `${theme.secondary}20`,
                    color:
                      message.sender === "ai" ? theme.primary : theme.secondary,
                  }}
                >
                  {message.sender === "ai" ? <FaRobot /> : <FaUser />}
                </div>
                <div
                  className={`px-4 py-2 rounded-lg max-w-[80%] ${
                    message.sender === "user" ? "ml-auto" : "mr-auto"
                  }`}
                  style={{
                    backgroundColor:
                      message.sender === "ai" ? theme.cardBg : theme.primary,
                    color: message.sender === "ai" ? theme.text : "#fff",
                    boxShadow: `0 2px 4px ${theme.shadow}`,
                  }}
                >
                  {message.text}
                </div>
              </motion.div>
            ))}

            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-start gap-3 mb-4"
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{
                    backgroundColor: `${theme.primary}20`,
                    color: theme.primary,
                  }}
                >
                  <FaRobot />
                </div>
                <div
                  className="px-4 py-2 rounded-lg max-w-[80%] animate-pulse"
                  style={{
                    backgroundColor: theme.cardBg,
                    color: theme.text,
                    boxShadow: `0 2px 4px ${theme.shadow}`,
                  }}
                >
                  AI is typing...
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>

      <div className="flex gap-2">
        <textarea
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your question here..."
          rows="1"
          className="flex-1 px-4 py-2 rounded-lg outline-none transition-all duration-300 resize-none"
          style={{
            backgroundColor: theme.background,
            color: theme.text,
            border: `1px solid ${theme.border}`,
          }}
        />
        <button
          onClick={handleSendMessage}
          className="px-4 py-2 rounded-lg transition-all duration-300 hover:opacity-90"
          style={{
            backgroundColor: theme.primary,
            color: "#fff",
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default AIChat;
