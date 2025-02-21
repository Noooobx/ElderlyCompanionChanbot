import React, { useState, useEffect } from "react";

const exercises = [
  { name: "Seated Knee Lifts", duration: 20, image: "https://scontent.fcok1-1.fna.fbcdn.net/v/t39.30808-6/468750487_10161847735952432_2848931569083285409_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=0b6b33&_nc_ohc=y65u8MFgRtcQ7kNvgFQl8Xd&_nc_oc=Adjjw6fN-jLOfNRH8tiwTi3wTIwOkaZHy5hCjIxuwq1OEAAyedEr833N_kS1N9k1wqHq-WZ3IGQWx5tzuZdH65iJ&_nc_zt=23&_nc_ht=scontent.fcok1-1.fna&_nc_gid=AP-aNomo8Hq-7FOO6u_bXJl&oh=00_AYCNfADqzGx1jR2y6nSBLnjow2Ddn7YvoAZCcyMdA8KJ8A&oe=67BEAAE2" },
  { name: "Shoulder Rolls", duration: 20, image: "https://media.istockphoto.com/id/1369323562/vector/woman-doing-neck-rolls-to-stretch-neck-muscle-before-a-workout-illustration-about-warmup.jpg?s=612x612&w=0&k=20&c=DTRV0IFdr20jL28q1fzpBYHcUEK6hI5yolHD4RcwsEQ=" },
  { name: "Wall Push-ups", duration: 10, image: "data:image/jpeg;base64,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" },
  { name: "Ankle Rotations", duration: 20, image: "https://www.shutterstock.com/image-vector/woman-doing-ankle-circles-exercise-260nw-2055236468.jpg" },
  { name: "Seated Marching", duration: 30, image: "https://www.onemedical.com/media/images/Vector_image_of_senior_man_demonstrating_Hip_Ma.original.png" },
  { name: "Neck Tilts", duration: 15, image: "https://www.shutterstock.com/image-vector/neck-rotation-exercise-turning-head-260nw-1494006533.jpg" },
  { name: "Finger Flexing", duration: 15, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5i_Qk0XT24Sqk56Ns-n8lvoJ3YZvwzaVELw&s" },
  { name: "Arm Raises", duration: 20, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeiyamx4_6GjrBPFnByCHRpr3Q-2UzajcAiA&s" },
  { name: "Toe Taps", duration: 20, image: "https://thumbs.dreamstime.com/z/man-doing-toe-tap-exercise-flat-vector-illustration-isolated-white-background-man-doing-toe-tap-exercise-297498548.jpg" },
  { name: "Deep Breathing", duration: 30, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSm6gr-F6MmEjIWkxVGfAAkmOmS1vlL4xYRMQ&s" },
];

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
    <div className="flex flex-col items-center min-h-screen p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">🏋️‍♂️ Elderly Exercise Routine</h1>

      <div className="w-full max-w-md bg-gray-300 rounded-full h-6 mb-4">
        <div
          className="bg-green-500 h-6 rounded-full text-white text-xs flex items-center justify-center"
          style={{ width: `${progress}%` }}
        >
          {Math.round(progress)}%
        </div>
      </div>

      <div className="w-full max-w-md bg-white p-4 rounded-lg shadow-md flex flex-col items-center">
        <h2 className="text-lg font-semibold mb-2">{exercises[currentExercise].name}</h2>
        <img src={exercises[currentExercise].image} alt={exercises[currentExercise].name} className="w-64 h-64 mb-4 rounded-lg shadow" />
        <p className="text-gray-500 mb-4">
          {isRunning ? `Time Left: ${timeLeft}s` : `${exercises[currentExercise].duration} sec`}
        </p>

        <div className="flex gap-4">
          <button
            onClick={handleStart}
            className="px-4 py-2 bg-blue-500 text-white rounded shadow-md"
            disabled={isRunning}
          >
            Start
          </button>
          <button
            onClick={handleComplete}
            className={`px-4 py-2 text-white rounded shadow-md ${
              completed[currentExercise] ? "bg-gray-400" : "bg-green-500"
            }`}
            disabled={isRunning || completed[currentExercise] || timeLeft > 0}
          >
            {completed[currentExercise] ? "Completed" : "Complete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ElderlyExercise;
