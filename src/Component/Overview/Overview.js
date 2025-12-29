import React, { useState } from "react";
import "./Overview.scss";
import { Link } from "react-router-dom";
import TripmatesPop from "../PopModals/TripmatesPop";
import AddChecklist from "../PopModals/AddChecklist";

const Overview = ({ trip, setTrip, tripId }) => {
  const [showTripmatesPopup, setShowTripmatesPopup] = useState(false);
  const [showAddChecklist, setShowAddChecklist] = useState(false);

  /* ---------------- ADD TRIPMATE ---------------- */
  const addTripmate = (mate) => {
    setTrip((prev) => ({
      ...prev,
      tripmates: [...(prev.tripmates || []), mate],
    }));
  };

  /* ---------------- REMOVE TRIPMATE ---------------- */
  const removeTripmate = (index) => {
    setTrip((prev) => ({
      ...prev,
      tripmates: prev.tripmates.filter((_, i) => i !== index),
    }));
  };

  /* ---------------- ADD CHECKLIST ---------------- */
  const addChecklist = (name) => {
    setTrip((prev) => ({
      ...prev,
      checklists: [...prev.checklists, { name, items: [] }],
    }));
  };

  /* ---------------- REMOVE CHECKLIST ---------------- */
  const removeChecklist = (index) => {
    setTrip((prev) => ({
      ...prev,
      checklists: prev.checklists.filter((_, i) => i !== index),
    }));
  };

  return (
    <>
      {/* ---------------- TRIPMATES ---------------- */}
      <div className="tripmateslist">
        <div className="tripmateslist-heading">
          <h2>Your Tripmates</h2>
          <div className="addmembers">
            <h2 onClick={() => setShowTripmatesPopup(true)}>+</h2>
          </div>
        </div>

        {(!trip.tripmates || trip.tripmates.length === 0) && (
          <p className="no-tripmates">No tripmates added yet</p>
        )}

        <ul>
          {trip.tripmates?.map((mate, index) => (
            <li key={index}>
              <div>
                <h3>{mate.name}</h3>
                <p>{mate.email}</p>
              </div>
              <h4 onClick={() => removeTripmate(index)}>Remove</h4>
            </li>
          ))}
        </ul>

        {showTripmatesPopup && (
          <TripmatesPop
            onAdd={addTripmate}
            onClose={() => setShowTripmatesPopup(false)}
          />
        )}
      </div>

      {/* ---------------- CHECKLISTS ---------------- */}
      <div className="overview-checklists">
        <div className="tripmateslist-heading">
          <h2>Your Checklists</h2>
          <div className="addmembers">
            <h2 onClick={() => setShowAddChecklist(true)}>+</h2>
          </div>
        </div>

        {(!trip.checklists || trip.checklists.length === 0) && (
          <p className="no-tripmates">No checklists added yet</p>
        )}

        <ul>
          {trip.checklists.map((checklist, index) => (
            <li key={index} className="checklist-heading">
              <Link to={`/trip/${tripId}/checklist/${index}`}>
                <h3>{checklist.name}</h3>
              </Link>
              <h4 onClick={() => removeChecklist(index)}>Remove</h4>
            </li>
          ))}
        </ul>

        {showAddChecklist && (
          <AddChecklist
            onAdd={addChecklist}
            onClose={() => setShowAddChecklist(false)}
          />
        )}
      </div>
    </>
  );
};

export default Overview;
