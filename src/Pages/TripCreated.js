import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Tabs from "../Component/Tabs/Tabs";
import Backarrow from "../Images/backarrow.png";
import AddChecklist from "../Component/PopModals/AddChecklist";
import "./PlanTrip.scss";
import { formatDate, getDayCount } from "../utils/dateUtils";

const TripCreated = () => {
  const location = useLocation();
  const { tripData } = location.state || {};
  const tripId = tripData?.id || 1; // Unique trip id
  const startDate = tripData?.startDate;
  const endDate = tripData?.endDate;
  const dayCount = getDayCount(startDate, endDate);

  const [trip, setTrip] = useState({
    id: tripId,
    destination: tripData?.destination || "",
    startDate: startDate || "",
    endDate: endDate || "",
    tripmates: tripData?.tripmates || [],
    checklists: [],
  });

  const [showAddChecklist, setShowAddChecklist] = useState(false);
  const [itemInputs, setItemInputs] = useState({});

  // Load trips from localStorage
  useEffect(() => {
    const savedTrips = JSON.parse(localStorage.getItem("trips")) || [];
    const currentTrip = savedTrips.find((t) => t.id === tripId);
    if (currentTrip) {
      setTrip(currentTrip);
    }
  }, [tripId]);

  // Save trips to localStorage whenever trip changes
  useEffect(() => {
    const savedTrips = JSON.parse(localStorage.getItem("trips")) || [];
    const otherTrips = savedTrips.filter((t) => t.id !== tripId);
    localStorage.setItem("trips", JSON.stringify([...otherTrips, trip]));
  }, [trip, tripId]);

  // ✅ Checklist handlers
  const addChecklist = (name) => {
    setTrip({
      ...trip,
      checklists: [...trip.checklists, { name, items: [] }],
    });
  };

  const handleAddItem = (cIndex, text) => {
    if (!text.trim()) return;
    const updated = [...trip.checklists];
    updated[cIndex].items.push({ text: text.trim(), completed: false });
    setTrip({ ...trip, checklists: updated });
  };

  const toggleComplete = (cIndex, iIndex) => {
    const updated = [...trip.checklists];
    updated[cIndex].items[iIndex].completed =
      !updated[cIndex].items[iIndex].completed;
    setTrip({ ...trip, checklists: updated });
  };

  const removeItem = (cIndex, iIndex) => {
    const updated = [...trip.checklists];
    updated[cIndex].items.splice(iIndex, 1);
    setTrip({ ...trip, checklists: updated });
  };

  const editItem = (cIndex, iIndex, newText) => {
    const updated = [...trip.checklists];
    updated[cIndex].items[iIndex].text = newText;
    setTrip({ ...trip, checklists: updated });
  };

  return (
    <div className="container planatrip">
      {/* Header */}
      <div className="Head">
        <Link to="/plantrip">
          <img src={Backarrow} alt="Back" />
        </Link>
        <div className="heading">
          <h1>{trip.destination || "Trip"}</h1>
          <p>
            {trip.startDate ? formatDate(trip.startDate) : "Sat, DD MM YYYY"} -{" "}
            {trip.endDate ? formatDate(trip.endDate) : "Sat, DD MM YYYY"}
          </p>
          <p>
            ({dayCount} Nights / {dayCount + 1} Days)
          </p>
        </div>
      </div>

      <Tabs tripData={trip} />

      {/* + Add List button */}
      <div className="floataddlist">
        <button onClick={() => setShowAddChecklist(true)}>+ Add List</button>
      </div>

      {/* AddChecklist popup */}
      {showAddChecklist && (
        <AddChecklist
          onAdd={addChecklist}
          onClose={() => setShowAddChecklist(false)}
        />
      )}

      {/* Render checklists */}
      {trip.checklists.map((checklist, cIndex) => (
        <div key={cIndex} className="checklist-container">
          <h3>{checklist.name}</h3>
          <div className="add-item">
            <input
              type="text"
              placeholder="New item"
              value={itemInputs[cIndex] || ""}
              onChange={(e) =>
                setItemInputs({ ...itemInputs, [cIndex]: e.target.value })
              }
            />
            <button
              onClick={() => {
                handleAddItem(cIndex, itemInputs[cIndex] || "");
                setItemInputs({ ...itemInputs, [cIndex]: "" });
              }}
            >
              Add Item
            </button>
          </div>

          <ul>
            {checklist.items.map((item, iIndex) => (
              <li key={iIndex}>
                <input
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => toggleComplete(cIndex, iIndex)}
                />
                <input
                  type="text"
                  value={item.text}
                  onChange={(e) => editItem(cIndex, iIndex, e.target.value)}
                  className={item.completed ? "completed" : ""}
                />
                <button onClick={() => removeItem(cIndex, iIndex)}>Remove</button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default TripCreated;
