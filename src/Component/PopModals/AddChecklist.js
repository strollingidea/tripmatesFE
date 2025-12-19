import React, { useState } from "react";
import "./AddChecklist.scss";

const AddChecklist = ({ onAdd, onClose }) => {
  const [checklistName, setChecklistName] = useState("");

  const handleAdd = () => {
    if (checklistName.trim() !== "") {
      onAdd(checklistName.trim());
      setChecklistName("");
      onClose();
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup">
        <h3>New Checklist Name</h3>
        <input
          type="text"
          placeholder="Checklist name"
          value={checklistName}
          onChange={(e) => setChecklistName(e.target.value)}
        />
        <div className="popup-buttons">
          <button onClick={handleAdd}>Add</button>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default AddChecklist;
