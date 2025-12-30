import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Backarrow from "../Images/backarrow.png";
import Tabs from "../Component/Tabs/Tabs";
import "./PlanTrip.scss";
import { formatDate, getDayCount } from "../utils/dateUtils";

const TripCreated = () => {
  const { tripId } = useParams();
  const navigate = useNavigate();

  // const reduxTripmates = useSelector(
  //   (state) => state.tripmates.tripmates
  // );

  const [trip, setTrip] = useState(null);
  const [showMenu, setShowMenu] = useState(false);

  /* 🔹 LOAD TRIP FROM USER-SPECIFIC STORAGE */
  useEffect(() => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      navigate("/signup");
      return;
    }

    const savedTrips =
      JSON.parse(localStorage.getItem(`trips_${userId}`)) || [];

    const currentTrip = savedTrips.find(
      (t) => String(t.id) === String(tripId)
    );

    if (!currentTrip) {
      navigate("/dashboard");
      return;
    }

    setTrip({
  ...currentTrip,
  tripmates: currentTrip.tripmates || [],
  checklists: currentTrip.checklists || [],
});
  }, [tripId, navigate]);

  /* 🔹 SAVE UPDATED TRIP */
  useEffect(() => {
    if (!trip) return;

    const userId = localStorage.getItem("userId");
    const savedTrips =
      JSON.parse(localStorage.getItem(`trips_${userId}`)) || [];

    const updatedTrips = savedTrips.map((t) =>
      t.id === trip.id ? trip : t
    );

    localStorage.setItem(
      `trips_${userId}`,
      JSON.stringify(updatedTrips)
    );
  }, [trip]);

  /* 🔹 SYNC REDUX TRIPMATES */
  // useEffect(() => {
  //   if (!trip) return;
  //   if (!reduxTripmates.length) return;

  //   setTrip((prev) => ({
  //     ...prev,
  //     tripmates: reduxTripmates,
  //   }));
  // }, [reduxTripmates]);

  /* 🔹 LOGOUT */
  const handleLogout = () => {
    localStorage.clear();
    navigate("/signup");
  };

  if (!trip) return null;

  const dayCount = getDayCount(trip.startDate, trip.endDate);

  return (
    <div className="container planatrip">
      {/* HEADER */}
      <div className="Head">
        <Link to="/dashboard">
            <img src={Backarrow} alt="Back" />
          </Link>
        <div className="heading">
          <h1>{trip.destination}</h1>
          <p>
            {formatDate(trip.startDate)} – {formatDate(trip.endDate)}
          </p>
          <p>
            ({dayCount} Nights / {dayCount + 1} Days)
          </p>
        </div>

        {/* MENU */}
        <div className="menu-wrapper">
          <span
            className="dots"
            onClick={() => setShowMenu(!showMenu)}
          >
            ⋮
          </span>

          {showMenu && (
            <div className="menu-dropdown">
              <Link to="/profile">Profile</Link>
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      </div>

      {/* TABS */}
      <Tabs tripData={trip} setTrip={setTrip} key={trip.id}/>
    </div>
  );
};

export default TripCreated;
