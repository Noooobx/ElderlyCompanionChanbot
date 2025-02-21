import { useState, useEffect } from "react";
import ChatBot from "react-simple-chatbot";
import axios from "axios";

const BotResponse = ({ previousStep, triggerNextStep }) => {
  const [response, setResponse] = useState("Typing...");

  useEffect(() => {
    const fetchResponse = async () => {
      try {
        const res = await axios.post(
          "http://127.0.0.1:8000/generate",
          { prompt: previousStep?.message },
          { headers: { "Content-Type": "application/json" } }
        );

        // Ensure response is clean and contains no junk
        let botReply = res.data.response?.trim() || "Sorry, I couldn't process that.";

        // Limit response length to prevent long messages
        if (botReply.length > 200) {
          botReply = botReply.substring(0, 200) + "...";
        }

        setResponse(botReply);
      } catch (error) {
        console.error("Error fetching response:", error);
        setResponse("Error fetching response.");
      } finally {
        setTimeout(() => triggerNextStep({ trigger: "2" }), 1500);
      }
    };

    if (previousStep?.message) fetchResponse();
  }, [previousStep, triggerNextStep]);

  return <span>{response}</span>;
};

const ChatbotComponent = () => {
  const steps = [
    { id: "1", message: "Hello! Ask me anything.", trigger: "2" },
    { id: "2", user: true, trigger: "3" },
    { id: "3", component: <BotResponse />, asMessage: true },
  ];

  return <ChatBot steps={steps} />;
};

export default ChatbotComponent;
