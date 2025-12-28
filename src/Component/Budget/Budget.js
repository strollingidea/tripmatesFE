import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AddExpenses from "../PopModals/AddExpenses";
import {
  addChecklistItem,
  removeChecklistItem,
} from "../../redux/slices/checklistSlice";

const Budget = ({ tripId }) => {
  const dispatch = useDispatch();
  const [showAddChecklist, setShowAddChecklist] = useState(false);

  // ✅ SAFE selector
  const checklists = useSelector(
    (state) => state.checklist?.items || []
  );

  /* ---------------- ADD CHECKLIST ---------------- */
  const addChecklist = (name) => {
    dispatch(addChecklistItem({ name, items: [] }));
  };

  /* ---------------- REMOVE CHECKLIST ---------------- */
  const removeChecklist = (index) => {
    dispatch(removeChecklistItem(index));
  };

  return (
    <div className="overview-checklists">
      <div className="tripmateslist-heading">
        <h2>Add Expenses</h2>

        <div className="addmembers">
          <h2 onClick={() => setShowAddChecklist(true)}>+</h2>
        </div>
      </div>

      {checklists.length === 0 && (
        <p className="no-tripmates">No Expenses added yet</p>
      )}

      <ul>
        {checklists.map((checklist, index) => (
          <li key={index} className="checklist-heading">
            <Link to={`/trip/${tripId}/checklist/${index}`}>
              <h3>{checklist.name}</h3>
            </Link>
            <button onClick={() => removeChecklist(index)}>
              Remove
            </button>
          </li>
        ))}
      </ul>

      {showAddChecklist && (
        <AddExpenses
          onAdd={addChecklist}
          onClose={() => setShowAddChecklist(false)}
        />
      )}
    </div>
  );
};

export default Budget;
