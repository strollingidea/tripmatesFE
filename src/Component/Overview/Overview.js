import React, { useState } from "react";
import "./Overview.scss";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeTripmate } from "../../redux/slices/removetripmateSlice";
import {
  addChecklistItem,
  removeChecklistItem,
} from "../../redux/slices/checklistSlice";
import TripmatesPop from "../PopModals/TripmatesPop";
import AddChecklist from "../PopModals/AddChecklist";

const Overview = ({ trip, setTrip, tripId }) => {
  const dispatch = useDispatch();
  const tripmates = useSelector((state) => state.tripmates.tripmates);

  const [showTripmatesPopup, setShowTripmatesPopup] = useState(false);
  const [showAddChecklist, setShowAddChecklist] = useState(false);

  /* ---------------- ADD CHECKLIST ---------------- */
  const addChecklist = (name) => {
    setTrip((prev) => ({
      ...prev,
      checklists: [...prev.checklists, { name, items: [] }],
    }));

    // redux + localStorage
    dispatch(addChecklistItem({ name, items: [] }));
  };

  /* ---------------- REMOVE CHECKLIST ---------------- */
  const removeChecklist = (index) => {
    // update local trip state
    setTrip((prev) => ({
      ...prev,
      checklists: prev.checklists.filter((_, i) => i !== index),
    }));

    // update redux + localStorage
    dispatch(removeChecklistItem(index));
  };

  return (
    <>
      {/* TRIPMATES */}
      <div className="tripmateslist">
        <div className="tripmateslist-heading">
          <h2>Your Tripmates</h2>
          <div className="addmembers">
            <h2 onClick={() => setShowTripmatesPopup(true)}>
              +
            </h2>
          </div>
        </div>

        {tripmates.length === 0 && (
          <p className="no-tripmates">No tripmates added yet</p>
        )}

        <ul>
          {tripmates.map((mate, index) => (
            <li key={index}>
              <div>
                <h3>{mate.name}</h3>
                <p>{mate.email}</p>
              </div>
              <h4 onClick={() => dispatch(removeTripmate(index))}>
                Remove
              </h4>
            </li>
          ))}
        </ul>

        

        {showTripmatesPopup && (
          <TripmatesPop onClose={() => setShowTripmatesPopup(false)} />
        )}
      </div>

      {/* CHECKLISTS */}
      <div className="overview-checklists">
        <div className="tripmateslist-heading">
          <h2>Your Checklists</h2>
          <div className="addmembers">
            <h2 onClick={() => setShowAddChecklist(true)}>
              +
            </h2>
          </div>
        </div>

        {trip?.checklists?.length === 0 && (
          <p className="no-tripmates">No checklists added yet</p>
        )}

        <ul>
          {trip?.checklists?.map((checklist, index) => (
            <li key={index} className="checklist-heading">
              <Link to={`/trip/${tripId}/checklist/${index}`}>
                <h3>{checklist.name}</h3>
              </Link>
              <h4 onClick={() => removeChecklist(index)}>
                Remove
              </h4>
            </li>
          ))}
        </ul>

        {/* ADD CHECKLIST */}
        

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
