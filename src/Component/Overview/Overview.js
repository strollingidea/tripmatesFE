import React, { useState } from "react";
import "./Overview.scss";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeTripmate } from "../../redux/slices/removetripmateSlice";
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
  };

  return (
    <>
      {/* TRIPMATES */}
      <div className="tripmateslist">
        <h2>Your Tripmates</h2>

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

        <div className="addmembers">
          <h2 onClick={() => setShowTripmatesPopup(true)}>
            + Add Tripmates
          </h2>
        </div>

        {showTripmatesPopup && (
          <TripmatesPop onClose={() => setShowTripmatesPopup(false)} />
        )}
      </div>

      {/* CHECKLISTS */}
      <div className="overview-checklists">
        <h2>Your Checklists</h2>

        {trip?.checklists?.length === 0 && (
          <p>No checklists added yet</p>
        )}

        {trip?.checklists?.map((checklist, index) => (
          <div key={index} className="checklist-heading">
            <Link to={`/trip/${tripId}/checklist/${index}`}>
              <h3>{checklist.name}</h3>
            </Link>
          </div>
        ))}

        {/* ADD CHECKLIST */}
        <div className="addmembers">
          <h2 onClick={() => setShowAddChecklist(true)}>
            + Add Checklist
          </h2>
        </div>


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
