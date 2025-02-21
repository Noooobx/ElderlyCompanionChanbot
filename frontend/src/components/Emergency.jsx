import React, { useState, useEffect } from "react";

const EmergencyButton = () => {
  // Retrieve stored contacts from localStorage
  const getStoredContacts = () => {
    const storedContacts = localStorage.getItem("contacts");
    return storedContacts ? JSON.parse(storedContacts) : [{ name: "vaishakmon", phone: "6235721468" }];
  };

  const [contacts, setContacts] = useState(getStoredContacts());
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");

  useEffect(() => {
    // Update localStorage whenever contacts change
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const sendEmergencyMessage = (method) => {
    const message = "🚨 Emergency Alert! Please check on me immediately.";
    const encodedMessage = encodeURIComponent(message);

    contacts.forEach((contact) => {
      if (method === "whatsapp") {
        const whatsappUrl = `https://api.whatsapp.com/send?phone=${contact.phone}&text=${encodedMessage}`;
        window.open(whatsappUrl, "_blank");
      } else if (method === "sms") {
        const smsUrl = `sms:${contact.phone}?body=${encodedMessage}`;
        window.open(smsUrl, "_blank");
      }
    });
  };

  const addContact = () => {
    if (!newName.trim() || !newPhone.trim()) {
      alert("Please enter both name and phone number.");
      return;
    }

    // Ensure phone number contains only digits
    const phonePattern = /^[0-9]{10}$/; // Adjust as per requirement
    if (!phonePattern.test(newPhone)) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }

    const updatedContacts = [...contacts, { name: newName.trim(), phone: newPhone.trim() }];
    setContacts(updatedContacts); // Update state
    setNewName("");
    setNewPhone("");
  };

  return (
    <div className="flex flex-col items-center p-4 bg-white shadow-lg rounded-lg w-full max-w-md">
      <h2 className="text-xl font-bold mb-2">Emergency Contacts</h2>

      {/* Contact List */}
      <ul className="w-full mb-4">
        {contacts.map((contact, index) => (
          <li key={index} className="flex justify-between items-center bg-gray-100 p-2 mb-2 rounded">
            <span>{contact.name} ({contact.phone})</span>
          </li>
        ))}
      </ul>

      {/* Add Contact Form */}
      <div className="flex flex-col w-full gap-2 mb-4">
        <input
          type="text"
          placeholder="Name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Phone Number"
          value={newPhone}
          onChange={(e) => setNewPhone(e.target.value)}
          className="border p-2 rounded"
        />
        <button onClick={addContact} className="bg-blue-500 text-white py-2 rounded shadow">
          ➕ Add Contact
        </button>
      </div>

      {/* Emergency Buttons */}
      <div className="flex gap-4">
        <button
          onClick={() => sendEmergencyMessage("whatsapp")}
          className="px-6 py-3 bg-green-600 text-white font-bold rounded-lg shadow-md hover:bg-green-700 transition"
        >
          📩 Send WhatsApp Alert
        </button>

        <button
          onClick={() => sendEmergencyMessage("sms")}
          className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-700 transition"
        >
          📲 Send SMS Alert
        </button>
      </div>

      <p className="text-sm text-gray-600 mt-2">
        Click to notify family members via WhatsApp or SMS.
      </p>
    </div>
  );
};

export default EmergencyButton;
