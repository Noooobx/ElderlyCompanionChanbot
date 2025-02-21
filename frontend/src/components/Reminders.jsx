import React, { useState, useEffect } from "react";

const Reminder = () => {
  const [reminders, setReminders] = useState([]);
  const [medicineName, setMedicineName] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    const checkReminder = () => {
      const currentTime = new Date().toTimeString().slice(0, 5); // Format: HH:MM (24-hour format)

      reminders.forEach((reminder) => {
        if (reminder.time === currentTime) {
          alert(`⚠️ Reminder: Did you take your ${reminder.medicine}?`);
        }
      });
    };

    const interval = setInterval(checkReminder, 1000); // Check every second
    return () => clearInterval(interval);
  }, [reminders]); // Runs when reminders change

  const addReminder = () => {
    if (medicineName && time) {
      setReminders([...reminders, { medicine: medicineName, time }]);
      setMedicineName("");
      setTime("");
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-4 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Medicine Reminder</h1>

      <div className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Medicine Name"
          value={medicineName}
          onChange={(e) => setMedicineName(e.target.value)}
          className="p-2 border rounded-lg shadow-sm"
        />
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="p-2 border rounded-lg shadow-sm"
        />
        <button
          onClick={addReminder}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
        >
          Add
        </button>
      </div>

      <div className="w-full max-w-md">
        <h2 className="text-xl font-semibold mb-2">Upcoming Reminders:</h2>
        <ul className="border p-3 rounded-lg bg-white shadow-md">
          {reminders.length > 0 ? (
            reminders.map((reminder, index) => (
              <li key={index} className="p-2 border-b">
                {reminder.medicine} - <strong>{reminder.time}</strong>
              </li>
            ))
          ) : (
            <p className="text-gray-500">No reminders set</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Reminder;


      