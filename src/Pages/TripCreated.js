import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import Tabs from "../Component/Tabs/Tabs";
import Backarrow from "../Images/backarrow.png";
import AddChecklist from "../Component/PopModals/AddChecklist";
import TripmatesPop from "../Component/PopModals/TripmatesPop";

import "./PlanTrip.scss";
import { formatDate, getDayCount } from "../utils/dateUtils";

const TripCreated = () => {
  const location = useLocation();
  const { tripData } = location.state || {};

  const tripId = tripData?.id || Date.now();
  const startDate = tripData?.startDate;
  const endDate = tripData?.endDate;
  const dayCount = getDayCount(startDate, endDate);

  // 🔹 Redux tripmates (TripmatesPop yahin add karta hai)
  const reduxTripmates = useSelector(
    (state) => state.tripmates.tripmates
  );

  const [trip, setTrip] = useState({
    id: tripId,
    destination: tripData?.destination || "",
    startDate: startDate || "",
    endDate: endDate || "",
    tripmates: tripData?.tripmates || [],
    checklists: tripData?.checklists || [],
  });

  const [showAddChecklist, setShowAddChecklist] = useState(false);
  const [showTripmatesPopup, setShowTripmatesPopup] = useState(false);

  /* ---------------- LOAD TRIP FROM LOCALSTORAGE ---------------- */
  useEffect(() => {
    const savedTrips = JSON.parse(localStorage.getItem("trips")) || [];
    const currentTrip = savedTrips.find((t) => t.id === tripId);
    if (currentTrip) {
      setTrip(currentTrip);
    }
  }, [tripId]);

  /* ---------------- SAVE TRIP TO LOCALSTORAGE ---------------- */
  useEffect(() => {
    const savedTrips = JSON.parse(localStorage.getItem("trips")) || [];
    const otherTrips = savedTrips.filter((t) => t.id !== tripId);
    localStorage.setItem("trips", JSON.stringify([...otherTrips, trip]));
  }, [trip, tripId]);

  /* ---------------- SYNC REDUX TRIPMATES ---------------- */
  useEffect(() => {
    if (reduxTripmates.length) {
      setTrip((prev) => ({
        ...prev,
        tripmates: reduxTripmates,
      }));
    }
  }, [reduxTripmates]);

  /* ---------------- CHECKLIST HANDLER ---------------- */
  const addChecklist = (name) => {
    setTrip({
      ...trip,
      checklists: [...trip.checklists, { name, items: [] }],
    });
  };

  /* ---------------- REMOVE TRIPMATE ---------------- */
  const removeTripmate = (index) => {
    const updated = [...trip.tripmates];
    updated.splice(index, 1);
    setTrip({ ...trip, tripmates: updated });
  };

  return (
    <div className="container planatrip">
      {/* Header */}
      <div className="Head">
        {/* <Link to="/plantrip">
          <img src={Backarrow} alt="Back" />
        </Link> */}

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

      {/* Tabs */}
      <Tabs tripData={trip} />

      {/* ---------------- TRIPMATES SECTION ---------------- */}
      <div className="addmembers">
        <h2 onClick={() => setShowTripmatesPopup(true)}>
          + Add Tripmates
        </h2>

      </div>

      {showTripmatesPopup && (
        <TripmatesPop onClose={() => setShowTripmatesPopup(false)} />
      )}

      {/* ---------------- ADD CHECKLIST ---------------- */}
      <div className="floataddlist">
        <button onClick={() => setShowAddChecklist(true)}>
          + Add List
        </button>
      </div>

      {showAddChecklist && (
        <AddChecklist
          onAdd={addChecklist}
          onClose={() => setShowAddChecklist(false)}
        />
      )}

      {/* ---------------- CHECKLIST HEADINGS ---------------- */}
      {trip.checklists.map((checklist, index) => (
        <div key={index} className="checklist-heading">
          <Link to={`/trip/${tripId}/checklist/${index}`}>
            <h3>{checklist.name}</h3>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default TripCreated;
