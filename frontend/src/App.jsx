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
    <div className="flex flex-col items-center justify-center h-screen gap-6 bg-gray-100 px-4">
      {/* Open Modal Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-600 text-white text-lg font-semibold px-8 py-3 rounded-xl shadow-lg hover:bg-blue-700 transition-all duration-300"
      >
        Activities
      </button>

      {/* Chatbot Section */}
      <div className=" rounded-2xl p-6 w-full max-w-md flex flex-col items-center border border-gray-200">
        <h2 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 drop-shadow-md tracking-wide mb-4">
          Eldy 🤖
        </h2>
        <ChatbotComponent />
      </div>
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
