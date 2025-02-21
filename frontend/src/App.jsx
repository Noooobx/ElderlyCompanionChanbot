import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import ChatbotComponent from "./components/ChatBotComponent.jsx";
import ModalComponent from "./components/ModalComponent.jsx";
import CognitiveTraining from "./components/CognitiveTraining.jsx";
import Reminders from "./components/Reminders.jsx";
import Emergency from "./components/Emergency.jsx";
import NewsDailyExercise from "./components/NewsDailyExercise.jsx";
import TickTakToe from "./components/TickTakToe.jsx";
import Game2048 from "./components/Game2048.jsx";
import ElderlyExercise from "./components/ElderlyExercise.jsx";

function Home({ setIsModalOpen }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: "100vh",
        gap: "20px",
        position: "relative",
      }}
    >
      {/* Open Modal Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-500 text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-600"
      >
        Open Options
      </button>

      {/* Chatbot Component */}
      <ChatbotComponent />
    </div>
  );
}

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();

  return (
    <div>
      {/* Modal Component should be available everywhere */}
      <ModalComponent
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <Routes>
        {/* Home Route */}
        <Route path="/" element={<Home setIsModalOpen={setIsModalOpen} />} />
        {/* Other Routes */}
        <Route path="/cognitive-training" element={<CognitiveTraining />} />
        <Route path="/reminders" element={<Reminders />} />
        <Route path="/tictactoe" element={<TickTakToe />} />

        <Route path="/game2048" element={<Game2048 />} />
        <Route path="/emergency" element={<Emergency />} />
        <Route path="/news" element={<NewsDailyExercise />} />
        <Route path="/daily-exercise" element={<ElderlyExercise />} />
      </Routes>
    </div>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
