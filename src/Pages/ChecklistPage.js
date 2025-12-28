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

  /* ---------------- LOAD TRIP ---------------- */
  useEffect(() => {
    const savedTrips = JSON.parse(localStorage.getItem("trips")) || [];
    const currentTrip = savedTrips.find(
      (t) => String(t.id) === String(tripId)
    );
    if (currentTrip) {
      setTrip(currentTrip);
    }
  }, [tripId]);

  /* ---------------- AUTO CREATE CHECKLIST ---------------- */
  useEffect(() => {
    if (!trip) return;

    if (!trip.checklists[cIndex]) {
      const updatedTrip = {
        ...trip,
        checklists: [
          ...trip.checklists,
          { name: `Checklist ${cIndex + 1}`, items: [] },
        ],
      };
      setTrip(updatedTrip);
    }
  }, [trip, cIndex]);

  /* ---------------- SAVE TRIP ---------------- */
  useEffect(() => {
    if (!trip) return;

    const savedTrips = JSON.parse(localStorage.getItem("trips")) || [];
    const otherTrips = savedTrips.filter(
      (t) => String(t.id) !== String(tripId)
    );
    localStorage.setItem("trips", JSON.stringify([...otherTrips, trip]));
  }, [trip, tripId]);

  if (!trip) {
    return <p>Loading...</p>;
  }

  /* ---------------- SAFE CHECKLIST ---------------- */
  const checklist =
    trip.checklists[cIndex] || { name: "Checklist", items: [] };

  /* ---------------- ADD ITEM ---------------- */
  const addItem = (text) => {
    setTrip((prev) => ({
      ...prev,
      checklists: prev.checklists.map((cl, i) =>
        i === cIndex
          ? {
              ...cl,
              items: [...cl.items, { text, completed: false }],
            }
          : cl
      ),
    }));
  };

  /* ---------------- TOGGLE COMPLETE ---------------- */
  const toggleComplete = (iIndex) => {
    setTrip((prev) => ({
      ...prev,
      checklists: prev.checklists.map((cl, i) =>
        i === cIndex
          ? {
              ...cl,
              items: cl.items.map((item, j) =>
                j === iIndex
                  ? { ...item, completed: !item.completed }
                  : item
              ),
            }
          : cl
      ),
    }));
  };

  /* ---------------- EDIT ITEM ---------------- */
  const editItem = (iIndex, newText) => {
    setTrip((prev) => ({
      ...prev,
      checklists: prev.checklists.map((cl, i) =>
        i === cIndex
          ? {
              ...cl,
              items: cl.items.map((item, j) =>
                j === iIndex ? { ...item, text: newText } : item
              ),
            }
          : cl
      ),
    }));
  };

  /* ---------------- REMOVE ITEM ---------------- */
  const removeItem = (iIndex) => {
    setTrip((prev) => ({
      ...prev,
      checklists: prev.checklists.map((cl, i) =>
        i === cIndex
          ? {
              ...cl,
              items: cl.items.filter((_, j) => j !== iIndex),
            }
          : cl
      ),
    }));
  };

  return (
    <div className="container planatrip">
      {/* HEADER */}
      <div className="Head">
        <Link to={`/tripcreated`}>
          <img src={Backarrow} alt="Back" />
        </Link>
        <h1>{checklist.name}</h1>
      </div>

      {/* ADD ITEM BUTTON */}
      <div className="floataddlist">
        <h2 onClick={() => setShowAddItem(true)}>
          +
        </h2>
      </div>

      {showAddItem && (
        <AddItem
          onAdd={addItem}
          onClose={() => setShowAddItem(false)}
        />
      )}

      {/* ITEMS */}
      <ul className="checklist-items">
        {checklist.items.length === 0 && (
          <p>No items added yet</p>
        )}

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
              onChange={(e) =>
                editItem(iIndex, e.target.value)
              }
              className={item.completed ? "completed" : ""}
            />

            <button onClick={() => removeItem(iIndex)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChecklistPage;
