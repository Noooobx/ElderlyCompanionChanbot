import React, { useState, useEffect } from "react";
import axios from "axios";

const Reminders = () => {
  const [reminders, setReminders] = useState([]);
  const [medicineName, setMedicineName] = useState("");
  const [time, setTime] = useState("");
  const [notifiedReminders, setNotifiedReminders] = useState(new Set());

  useEffect(() => {
    fetchReminders();
  }, []);

  useEffect(() => {
    const checkReminder = async () => {
      const currentTime = new Date().toTimeString().slice(0, 5);
      reminders.forEach(async (reminder) => {
        if (reminder.time === currentTime && !notifiedReminders.has(reminder.medicine)) {
          alert(`⚠️ Reminder: Did you take your ${reminder.medicine}?`);

          try {
            await axios.post("http://localhost:8080/send_notification", {
              medicine: reminder.medicine,
            });
          } catch (error) {
            console.error("Error sending notification:", error);
          }
          setNotifiedReminders((prev) => new Set(prev).add(reminder.medicine));
        }
      });
    };

    const interval = setInterval(checkReminder, 60000);
    return () => clearInterval(interval);
  }, [reminders]);

  const fetchReminders = async () => {
    try {
      const response = await axios.get("http://localhost:8080/reminders");
      setReminders(response.data.reminders);
    } catch (error) {
      console.error("Error fetching reminders:", error);
    }
  };

  const addReminder = async () => {
    if (!medicineName || !time) return;
    try {
      const response = await axios.post("http://localhost:8080/reminders", {
        medicine: medicineName,
        time,
      });
      setReminders(response.data.reminders);
      setMedicineName("");
      setTime("");
    } catch (error) {
      console.error("Error adding reminder:", error);
    }
  };

  const deleteReminder = async (medicine) => {
    try {
      const response = await axios.delete(`http://localhost:8080/reminders/${medicine}`);
      setReminders(response.data.reminders);
      setNotifiedReminders((prev) => {
        const newSet = new Set(prev);
        newSet.delete(medicine);
        return newSet;
      });
    } catch (error) {
      console.error("Error deleting reminder:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <h1 className="text-3xl font-semibold text-gray-900 mb-6">Medicine Reminder</h1>

      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Medicine Name"
            value={medicineName}
            onChange={(e) => setMedicineName(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          />
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          />
          <button
            onClick={addReminder}
            className="w-full py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
          >
            Add Reminder
          </button>
        </div>
      </div>

      <div className="mt-6 w-full max-w-md">
        <h2 className="text-lg font-medium text-gray-700 mb-2">Upcoming Reminders:</h2>
        <ul className="bg-white p-4 rounded-lg shadow-md divide-y">
          {reminders.length > 0 ? (
            reminders.map((reminder, index) => (
              <li key={index} className="py-3 flex justify-between items-center">
                <span className="text-gray-800">{reminder.medicine} - <strong>{reminder.time}</strong></span>
                <button
                  onClick={() => deleteReminder(reminder.medicine)}
                  className="px-3 py-1 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </li>
            ))
          ) : (
            <p className="text-gray-500 text-center">No reminders set</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Reminders;
