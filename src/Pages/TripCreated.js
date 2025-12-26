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

  /* 🔹 Redux Tripmates */
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

  /* 🔹 3 DOT MENU STATE */
  const [showMenu, setShowMenu] = useState(false);

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

  /* ---------------- ADD CHECKLIST ---------------- */
  const addChecklist = (name) => {
    setTrip({
      ...trip,
      checklists: [...trip.checklists, { name, items: [] }],
    });
  };

  /* ---------------- LOGOUT ---------------- */
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div className="container planatrip">
      {/* HEADER */}
      <div className="Head">
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

        {/* 🔹 3 DOT MENU */}
        <div className="menu-wrapper">
          <span
            className="dots"
            onClick={() => setShowMenu((prev) => !prev)}
          >
            ⋮
          </span>

          {showMenu && (
            <div className="menu-dropdown">
              <Link to="/profile" onClick={() => setShowMenu(false)}>
                Profile
              </Link>
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      </div>

      {/* TABS */}
      <Tabs tripData={trip} setTrip={setTrip}/>

      {/* ADD CHECKLIST */}
      
    </div>
  );
};

export default TripCreated;
