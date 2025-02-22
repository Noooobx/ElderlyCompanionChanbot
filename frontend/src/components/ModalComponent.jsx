import React from "react";
import { useNavigate } from "react-router-dom";

const ModalComponent = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const options = [
    { name: "🧠 Cognitive Training", path: "/cognitive-training" },
    { name: "⏰ Reminders", path: "/reminders" },
    { name: "🚨 Emergency", path: "/emergency" },
    { name: "📰 News & Daily Exercise", path: "/news" },
    {name:"Daily-Exercise",path:"/daily-exercise"},
    {name:"Story-Teller",path:"/story"}
  ];

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md"
      style={{ zIndex: 1000 }}
    >
      <div className="bg-white p-6 rounded-2xl shadow-xl w-96 relative flex flex-col items-center text-center">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-800 text-xl"
        >
          ✖
        </button>

        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Choose an Option
        </h2>

        <ul className="w-full space-y-3">
          {options.map((option, index) => (
            <li
              key={index}
              className="p-3 bg-gray-100 w-full rounded-lg cursor-pointer hover:bg-blue-500 hover:text-white transition"
              onClick={() => {
                navigate(option.path);
                onClose();
              }}
            >
              {option.name}
            </li>
          ))}
        </ul>

        <button
          onClick={onClose}
          className="mt-6 bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ModalComponent;
