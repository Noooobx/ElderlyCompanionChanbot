import React, { useState, useEffect } from "react";

const EmergencyButton = () => {
  const getStoredContacts = () => {
    const storedContacts = localStorage.getItem("contacts");
    return storedContacts ? JSON.parse(storedContacts) : [{ name: "binil", phone: "9544736726" }];
  };

  const [contacts, setContacts] = useState(getStoredContacts());
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const sendEmergencyMessage = (method) => {
    const message = "🚨 Emergency Alert! Please check on me immediately.";
    const encodedMessage = encodeURIComponent(message);

    contacts.forEach((contact) => {
      const url = method === "whatsapp"
        ? `https://api.whatsapp.com/send?phone=${contact.phone}&text=${encodedMessage}`
        : `sms:${contact.phone}?body=${encodedMessage}`;
      window.open(url, "_blank");
    });
  };

  const addContact = () => {
    if (!newName.trim() || !newPhone.trim()) {
      alert("Enter both name and phone number.");
      return;
    }

    const phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(newPhone)) {
      alert("Enter a valid 10-digit phone number.");
      return;
    }

    setContacts([...contacts, { name: newName.trim(), phone: newPhone.trim() }]);
    setNewName("");
    setNewPhone("");
  };

  const removeContact = (index) => {
    const updatedContacts = contacts.filter((_, i) => i !== index);
    setContacts(updatedContacts);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Emergency Contacts</h2>

        {/* Contact List */}
        <div className="space-y-2 mb-4">
          {contacts.map((contact, index) => (
            <div key={index} className="flex justify-between items-center bg-gray-100 px-3 py-2 rounded-md">
              <span className="text-gray-700 text-sm">{contact.name} - {contact.phone}</span>
              <button onClick={() => removeContact(index)} className="text-red-500 text-sm font-bold">❌</button>
            </div>
          ))}
        </div>

        {/* Add Contact */}
        <div className="flex flex-col gap-2 mb-4">
          <input
            type="text"
            placeholder="Name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <input
            type="text"
            placeholder="Phone Number"
            value={newPhone}
            onChange={(e) => setNewPhone(e.target.value)}
            className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <button onClick={addContact} className="bg-blue-600 text-white text-sm py-2 rounded-md shadow-md hover:bg-blue-700 transition">
            ➕ Add Contact
          </button>
        </div>

        {/* Emergency Buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => sendEmergencyMessage("whatsapp")}
            className="flex-1 bg-green-500 text-white text-sm py-2 rounded-md shadow-md hover:bg-green-600 transition"
          >
            📩 WhatsApp Alert
          </button>
          <button
            onClick={() => sendEmergencyMessage("sms")}
            className="flex-1 bg-blue-500 text-white text-sm py-2 rounded-md shadow-md hover:bg-blue-600 transition"
          >
            📲 SMS Alert
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmergencyButton;
