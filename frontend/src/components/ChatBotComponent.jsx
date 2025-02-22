import { useState, useEffect, useRef } from "react";
import ChatBot from "react-simple-chatbot";
import axios from "axios";

const BotResponse = ({ previousStep, triggerNextStep }) => {
  const [response, setResponse] = useState("Typing...");

  useEffect(() => {
    const fetchResponse = async () => {
      try {
        const userMessage = previousStep?.message?.toLowerCase();

        const res = await axios.post(
          "http://127.0.0.1:8080/generate",
          { prompt: previousStep?.message },
          { headers: { "Content-Type": "application/json" } }
        );

        let botReply = res.data.response?.trim() || "Sorry, I couldn't process that.";

        if (botReply.length > 200) {
          botReply = botReply.substring(0, 200) + "...";
        }

        setResponse(botReply);
        setTimeout(() => speak(botReply), 500);

        // Emergency WhatsApp Alert
        if (userMessage.includes("emergency")) {
          await axios.post("http://127.0.0.1:8080/send-whatsapp", {
            message: `Emergency Alert: The user said '${previousStep.message}'.`,
          });
        }
      } catch (error) {
        console.error("Error fetching response:", error);
        setResponse("Error fetching response.");
      } finally {
        setTimeout(() => triggerNextStep({ trigger: "2" }), 1500);
      }
    };

    if (previousStep?.message) fetchResponse();
  }, [previousStep, triggerNextStep]);

  // Web Speech API - Text-to-Speech
  const speak = (text) => {
    if ("speechSynthesis" in window) {
      speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      utterance.rate = 1;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
    }
  };

  return <span>{response}</span>;
};

const ChatbotComponent = () => {
  const [input, setInput] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = "en-US";

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
      };

      recognitionRef.current.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
      };
    } else {
      alert("Speech recognition is not supported in your browser.");
    }
  }, []);

  const handleRecord = () => {
    if (recognitionRef.current) {
      setIsRecording(true);
      recognitionRef.current.start();
    }
  };

  const handleStop = () => {
    if (recognitionRef.current) {
      setIsRecording(false);
      recognitionRef.current.stop();
    }
  };

  const steps = [
    { id: "1", message: "Hello! Ask me anything.", trigger: "2" },
    { id: "2", user: true, trigger: "3" },
    { id: "3", component: <BotResponse />, asMessage: true },
  ];

  return (
    <div className="flex flex-col">
      <button
        onMouseDown={handleRecord}
        onMouseUp={handleStop}
        style={{
          padding: "10px 15px",
          marginBottom: "10px",
          backgroundColor: isRecording ? "red" : "green",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        {isRecording ? "Recording..." : "Hold to Speak"}
      </button>
      {input && (
        <p style={{ fontSize: "16px", fontWeight: "bold" }}>You said: {input}</p>
      )}
      <ChatBot steps={steps} />
    </div>
  );
};

export default ChatbotComponent;
