import ChatBot from "react-simple-chatbot";

const steps = [
  { id: "1", message: "Hello! How can I assist you?", trigger: "2" },
  { id: "2", user: true, trigger: "3" },
  { id: "3", message: "Thanks for your response!", end: true },
];

function ChatBotComponent() {
  return <ChatBot steps={steps} />;
}

export default ChatBotComponent;
