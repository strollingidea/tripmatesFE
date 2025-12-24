import React, { useState } from "react";
import "./AddChecklist.scss"; // same modal styling reuse

const AddItem = ({ onAdd, onClose }) => {
  const [text, setText] = useState("");

  const handleAdd = () => {
    if (!text.trim()) return;
    onAdd(text.trim());
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Add Item</h2>

        <input
          type="text"
          placeholder="Enter item name"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <div className="modal-actions">
          <button onClick={handleAdd}>Add</button>
          <button className="cancel" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddItem;
