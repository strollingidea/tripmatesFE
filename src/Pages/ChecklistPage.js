import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Backarrow from "../Images/backarrow.png";
import AddItem from "../Component/PopModals/AddItem";
import "./PlanTrip.scss";

const ChecklistPage = () => {
  const { tripId, checklistIndex } = useParams();
  const cIndex = Number(checklistIndex);

  const [trip, setTrip] = useState(null);
  const [showAddItem, setShowAddItem] = useState(false);

  // Load trip
  useEffect(() => {
    const savedTrips = JSON.parse(localStorage.getItem("trips")) || [];
    const currentTrip = savedTrips.find(
      (t) => String(t.id) === String(tripId)
    );
    if (currentTrip) setTrip(currentTrip);
  }, [tripId]);

  // Save trip
  useEffect(() => {
    if (!trip) return;
    const savedTrips = JSON.parse(localStorage.getItem("trips")) || [];
    const otherTrips = savedTrips.filter(
      (t) => String(t.id) !== String(tripId)
    );
    localStorage.setItem("trips", JSON.stringify([...otherTrips, trip]));
  }, [trip, tripId]);

  if (!trip || !trip.checklists[cIndex]) {
    return <p>Checklist not found</p>;
  }

  const checklist = trip.checklists[cIndex];

  // Add item from popup
  const addItem = (text) => {
    const updatedTrip = { ...trip };
    updatedTrip.checklists[cIndex].items.push({
      text,
      completed: false,
    });
    setTrip(updatedTrip);
  };

  const toggleComplete = (iIndex) => {
    const updatedTrip = { ...trip };
    const item = updatedTrip.checklists[cIndex].items[iIndex];
    item.completed = !item.completed;
    setTrip(updatedTrip);
  };

  const editItem = (iIndex, newText) => {
    const updatedTrip = { ...trip };
    updatedTrip.checklists[cIndex].items[iIndex].text = newText;
    setTrip(updatedTrip);
  };

  const removeItem = (iIndex) => {
    const updatedTrip = { ...trip };
    updatedTrip.checklists[cIndex].items.splice(iIndex, 1);
    setTrip(updatedTrip);
  };

  return (
    <div className="container planatrip">
      {/* Header */}
      <div className="Head">
        <Link to={`/tripcreated`}>
          <img src={Backarrow} alt="Back" />
        </Link>
        <h1>{checklist.name}</h1>
      </div>

      {/* Add Item Button */}
      <div className="floataddlist">
        <button onClick={() => setShowAddItem(true)}>
          + Add Item
        </button>
      </div>

      {/* Add Item Popup */}
      {showAddItem && (
        <AddItem
          onAdd={addItem}
          onClose={() => setShowAddItem(false)}
        />
      )}

      {/* Items */}
      <ul className="checklist-items">
        {checklist.items.map((item, iIndex) => (
          <li key={iIndex}>
            <input
              type="checkbox"
              checked={item.completed}
              onChange={() => toggleComplete(iIndex)}
            />

            <input
              type="text"
              value={item.text}
              onChange={(e) => editItem(iIndex, e.target.value)}
              className={item.completed ? "completed" : ""}
            />

            <button onClick={() => removeItem(iIndex)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChecklistPage;
