import React from "react";
import "./Overview.scss";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeTripmate } from "../../redux/slices/removetripmateSlice";

const Overview = ({ trip, tripId }) => {
  const dispatch = useDispatch();
  const tripmates = useSelector((state) => state.tripmates.tripmates);

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
      </div>

      {/* ✅ CHECKLIST HEADINGS */}
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
      </div>
    </>
  );
};

export default Overview;
