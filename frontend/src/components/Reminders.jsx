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
            console.log(`✅ Notification sent for ${reminder.medicine}`);
          } catch (error) {
            console.error("❌ Error sending notification:", error);
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
      console.error("❌ Error fetching reminders:", error);
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
      console.log(`✅ Reminder added: ${medicineName} at ${time}`);
    } catch (error) {
      console.error("❌ Error adding reminder:", error);
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
      console.log(`🗑️ Reminder deleted: ${medicine}`);
    } catch (error) {
      console.error("❌ Error deleting reminder:", error);
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
              <li key={index} className="p-2 border-b flex justify-between">
                <span>
                  {reminder.medicine} - <strong>{reminder.time}</strong>
                </span>
                <button
                  onClick={() => deleteReminder(reminder.medicine)}
                  className="px-2 py-1 text-sm bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Delete
                </button>
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

export default Reminders;
