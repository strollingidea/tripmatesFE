import React, { useState } from "react";
import "./AddChecklist.scss";

const AddExpenses = ({ onAdd, onClose, tripmates }) => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [paidBy, setPaidBy] = useState("");

  const handleAdd = () => {
    if (!name.trim() || !paidBy) return;

    onAdd({
      id: Date.now(), // simple unique id
      name: name.trim(),
      amount: Number(amount) || 0,
      paidBy,
    });

    setName("");
    setAmount("");
    setPaidBy("");
    onClose();
  };

  return (
    <div className="popup-overlay">
      <div className="popup">
        <h3>Add Expense</h3>

        <input
          type="text"
          placeholder="Expense name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        {/* 🔽 Tripmates Dropdown */}
        <select
          value={paidBy}
          onChange={(e) => setPaidBy(e.target.value)}
        >
          <option value="">Paid by</option>
          {tripmates.map((mate) => (
            <option key={mate.id} value={mate.name}>
              {mate.name}
            </option>
          ))}
        </select>
        

        <div className="popup-buttons">
          <h3 onClick={handleAdd}>Add</h3>
          <h4 onClick={onClose}>Close</h4>
        </div>
      </div>
    </div>
  );
};

export default AddExpenses;
