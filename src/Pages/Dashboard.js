import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Dashboard.scss";
import ProfileImg from "../Images/profile.png";
import TripImg from "../Images/trip-placeholder.png";

const Dashboard = () => {
  const navigate = useNavigate();
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    const savedTrips = JSON.parse(localStorage.getItem("trips")) || [];
    setTrips(savedTrips);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  return (
    <div className="dashboard">
      {/* HEADER */}
      <header className="dashboard-header">
        <h1 className="logo">TripMate</h1>

        <div className="profile-menu">
          <img src={ProfileImg} alt="Profile" />
          <div className="dropdown">
            <Link to="/profile">Profile</Link>
            <button onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </header>

      {/* YOUR TRIPS */}
      <section className="your-trips">
        <div className="title-row">
          <h2>Your Trips</h2>
          <Link to="/plantrip">+ Create New Trip</Link>
        </div>

        {trips.length === 0 ? (
          <div className="empty-state">
            <p>No trips yet ✈️</p>
            <Link to="/plantrip">Create your first trip</Link>
          </div>
        ) : (
          <div className="trip-slider">
            {trips.map((trip) => (
              <Link
                to={`/trip/${trip.id}`}
                className="trip-card"
                key={trip.id}
              >
                <img src={TripImg} alt="Trip" />

                <div className="trip-info">
                  <h3>{trip.destination}</h3>
                  <p>
                    {trip.startDate} – {trip.endDate}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Dashboard;
