import React, { useState } from "react";
import "./Overview.scss";
import { Link } from "react-router-dom";
import TripmatesPop from "../PopModals/TripmatesPop";
import AddChecklist from "../PopModals/AddChecklist";

const Overview = ({ trip, setTrip, tripId }) => {
  const [showTripmatesPopup, setShowTripmatesPopup] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [showAddChecklist, setShowAddChecklist] = useState(false);

  /* ➕ ADD TRIPMATE */
  const addTripmate = (mate) => {
    setTrip((prev) => ({
      ...prev,
      tripmates: [...prev.tripmates, mate],
    }));
  };

  /* ❌ REMOVE TRIPMATE */
  const removeTripmate = (index) => {
    setTrip((prev) => ({
      ...prev,
      tripmates: prev.tripmates.filter((_, i) => i !== index),
    }));
  };

  /* ✏️ UPDATE TRIPMATE */
  const updateTripmate = (updatedMate) => {
    setTrip((prev) => ({
      ...prev,
      tripmates: prev.tripmates.map((mate, i) =>
        i === editIndex ? updatedMate : mate
      ),
    }));
    setEditIndex(null);
  };

  return (
    <>
      {/* 👥 TRIPMATES */}
      <div className="tripmateslist">
        <div className="tripmateslist-heading">
          <h2>Your Tripmates</h2>
          <div className="addmembers">
            <h2 onClick={() => setShowTripmatesPopup(true)}>+</h2>
          </div>
        </div>

        {trip.tripmates.length === 0 && (
          <p className="no-tripmates">No tripmates added yet</p>
        )}

        <ul>
          {trip.tripmates.map((mate, index) => (
            <li key={index}>
              <div>
                <h3>{mate.name}</h3>
                <p>{mate.email}</p>
              </div>

              <div className="tripmate-actions">
                <span
                  onClick={() => setEditIndex(index)}
                  className="edit-btn"
                >
                  ✏️
                </span>
                <span
                  onClick={() => removeTripmate(index)}
                  className="remove-btn"
                >
                  Remove
                </span>
              </div>
            </li>
          ))}
        </ul>

        {/* ADD */}
        {showTripmatesPopup && (
          <TripmatesPop
            onAdd={addTripmate}
            onClose={() => setShowTripmatesPopup(false)}
          />
        )}

        {/* EDIT */}
        {editIndex !== null && (
          <TripmatesPop
            initialData={trip.tripmates[editIndex]}
            onAdd={updateTripmate}
            onClose={() => setEditIndex(null)}
          />
        )}
      </div>

      {/* 📦 CHECKLISTS */}
      <div className="overview-checklists">
        <div className="tripmateslist-heading">
          <h2>Your Checklists</h2>
          <div className="addmembers">
            <h2 onClick={() => setShowAddChecklist(true)}>+</h2>
          </div>
        </div>

        {trip.checklists.length === 0 && (
          <p className="no-tripmates">No checklists added yet</p>
        )}

        <ul>
          {trip.checklists.map((checklist, index) => (
            <li key={index} className="checklist-heading">
              <Link to={`/trip/${tripId}/checklist/${index}`}>
                <h3>{checklist.name}</h3>
              </Link>
            </li>
          ))}
        </ul>

        {showAddChecklist && (
          <AddChecklist
            onAdd={(name) =>
              setTrip((prev) => ({
                ...prev,
                checklists: [...prev.checklists, { name, items: [] }],
              }))
            }
            onClose={() => setShowAddChecklist(false)}
          />
        )}
      </div>
    </>
  );
};

export default Overview;
