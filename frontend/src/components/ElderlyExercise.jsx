import React, { useState, useEffect } from "react";
import exercises from "../constants";

const ElderlyExercise = () => {
  const [currentExercise, setCurrentExercise] = useState(0);
  const [completed, setCompleted] = useState(Array(exercises.length).fill(false));
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  const handleStart = () => {
    setTimeLeft(exercises[currentExercise].duration);
    setIsRunning(true);
  };

  const handleComplete = () => {
    if (timeLeft === 0) {
      setCompleted((prev) => {
        const updated = [...prev];
        updated[currentExercise] = true;
        return updated;
      });

      if (currentExercise < exercises.length - 1) {
        setCurrentExercise(currentExercise + 1);
        setTimeLeft(0);
        setIsRunning(false);
      }
    }
  };

  const progress = (completed.filter(Boolean).length / exercises.length) * 100;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">🏋️‍♂️ Elderly Exercise Routine</h1>

      {/* Progress Bar */}
      <div className="w-full max-w-lg bg-gray-300 rounded-full h-6 mb-6 overflow-hidden shadow">
        <div
          className="bg-green-500 h-6 rounded-full text-white text-xs flex items-center justify-center transition-all duration-300"
          style={{ width: `${progress}%` }}
        >
          {Math.round(progress)}%
        </div>
      </div>

      {/* Exercise Card */}
      <div className="w-full max-w-lg bg-white p-6 rounded-2xl shadow-lg flex flex-col items-center text-center">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">{exercises[currentExercise].name}</h2>
        <img
          src={exercises[currentExercise].image}
          alt={exercises[currentExercise].name}
          className="w-72 h-72 mb-4 rounded-xl shadow-md"
        />
        <p className="text-gray-600 mb-6 text-lg font-medium">
          {isRunning ? `⏳ Time Left: ${timeLeft}s` : `⏱ ${exercises[currentExercise].duration} sec`}
        </p>

        {/* Buttons */}
        <div className="flex gap-6">
          <button
            onClick={handleStart}
            className="px-5 py-3 bg-blue-500 text-white rounded-xl shadow-md text-lg font-medium transition hover:bg-blue-600"
            disabled={isRunning}
          >
            Start
          </button>
          <button
            onClick={handleComplete}
            className={`px-5 py-3 text-white rounded-xl shadow-md text-lg font-medium transition ${
              completed[currentExercise] ? "bg-gray-400 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"
            }`}
            disabled={isRunning || completed[currentExercise] || timeLeft > 0}
          >
            {completed[currentExercise] ? "✔ Completed" : "✅ Complete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ElderlyExercise;
