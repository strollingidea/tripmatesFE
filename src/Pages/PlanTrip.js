import React, { useRef, useState, useEffect } from "react";
import "./PlanTrip.scss";
import Backarrow from "../Images/backarrow.png";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { DetailsSchema } from "../Component/Schema/DetailsSchema";
import TripmatesPop from "../Component/PopModals/TripmatesPop";
import { useDispatch, useSelector } from "react-redux";
import { removeTripmate } from "../redux/slices/removetripmateSlice";
import axios from "axios";

const PlanTrip = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inputRef = useRef();

  const tripmates = useSelector((state) => state.tripmates.tripmates);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handlepopup = async() => {
    setIsPopupOpen(!isPopupOpen);
  };

  const initialValues = {
    destination: "",
    startDate: "",
    endDate: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema: DetailsSchema,
    onSubmit: (values) => {
     try {
       const userId = localStorage.getItem("userId");

      if (!userId) {
        alert("User not logged in");
        return;
      }

      const newTrip = {
        id: Date.now(),
        destination: values.destination,
        startDate: values.startDate,
        endDate: values.endDate,
        tripmates,
      };

     axios.post(`${process.env.REACT_APP_BACKEND_URL}api/trips/create`, newTrip);
     console.log("API CREATE gfbhgfhgkhbgkhkhkhgshgkrhgrtkrkhkrtghtr")

      // Get existing trips of this user
      const existingTrips =
        JSON.parse(localStorage.getItem(`trips_${userId}`)) || [];

      // Add new trip
      const updatedTrips = [...existingTrips, newTrip];

      // Save back user-specific trips
      localStorage.setItem(
        `trips_${userId}`,
        JSON.stringify(updatedTrips)
      );

      navigate("/dashboard");
     } catch (error) {
        console.error("Error creating trip:", error);
     }
    },
  });

  const { values, handleSubmit } = formik;

  // OPTIONAL: preload last trip of logged-in user
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    const savedTrips =
      JSON.parse(localStorage.getItem(`trips_${userId}`)) || [];

    if (savedTrips.length > 0) {
      const lastTrip = savedTrips[savedTrips.length - 1];
      formik.setValues({
        destination: lastTrip.destination || "",
        startDate: lastTrip.startDate || "",
        endDate: lastTrip.endDate || "",
      });
    }
  }, []);

  const condition =
    !values.destination ||
    Object.keys(formik.errors).length !== 0;

  return (
    <>
      <div className="container planatrip">
        {/* HEADER */}
        <div className="Head">
          <Link to="/dashboard">
            <img src={Backarrow} alt="Back" />
          </Link>
          <div className="heading">
            <h1>Plan a Trip</h1>
            <p>Build an itinerary and map out your upcoming plans</p>
          </div>
        </div>

        {/* INPUTS */}
        <div className="inputdata">
          <input
            type="text"
            name="destination"
            placeholder="Where To"
            value={values.destination}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.destination && formik.errors.destination && (
            <div>{formik.errors.destination}</div>
          )}

          <div className="date-range-picker">
            <label className="label">Dates (optional)</label>

            <div className="date-inputs">
              <div className="date-input" style={{ marginRight: "10px" }}>
                <span className="date-text">
                  <input
                    name="startDate"
                    ref={inputRef}
                    type="date"
                    value={values.startDate}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </span>
                {formik.touched.startDate &&
                  formik.errors.startDate && (
                    <div>{formik.errors.startDate}</div>
                  )}
              </div>

              <div className="date-input">
                <span className="date-text">
                  <input
                    name="endDate"
                    type="date"
                    value={values.endDate}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    min={values.startDate}
                  />
                </span>
                {formik.touched.endDate &&
                  formik.errors.endDate && (
                    <div>{formik.errors.endDate}</div>
                  )}
              </div>
            </div>
          </div>
        </div>

        {/* TRIPMATES */}
        <div className="tripmateslist">
          <div className="tripmateslist-heading">
            <h2>Your Tripmates</h2>
            <div className="addmembers">
              <h2 onClick={handlepopup}>+</h2>
            </div>
          </div>

          {tripmates.length === 0 && (
            <p className="no-tripmates">No tripmates added yet</p>
          )}

          {isPopupOpen && <TripmatesPop onClose={handlepopup} />}

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

        {/* CTA */}
        <div className="floatctastart">
          <button onClick={handleSubmit} disabled={condition}>
            Create your trip
          </button>
        </div>
      </div>
    </>
  );
};

export default PlanTrip;
