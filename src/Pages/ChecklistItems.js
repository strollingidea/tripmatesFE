import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ChecklistItems = () => {
  const { tripId, index } = useParams();
  const navigate = useNavigate();

  const [trip, setTrip] = useState(null);
  const [itemText, setItemText] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState("");

  /* 🔹 LOAD TRIP */
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      navigate("/signup");
      return;
    }

    const trips =
      JSON.parse(localStorage.getItem(`trips_${userId}`)) || [];

    const foundTrip = trips.find(
      (t) => String(t.id) === String(tripId)
    );

    if (!foundTrip) {
      navigate("/dashboard");
      return;
    }

    foundTrip.checklists = foundTrip.checklists || [];
    setTrip(foundTrip);
  }, [tripId, navigate]);

  if (!trip) return null;

  const checklist = trip.checklists[index];
  if (!checklist) {
    return <p>Checklist not found</p>;
  }

  checklist.items = checklist.items || [];

  /* 🔹 SAVE TRIP */
  const saveTrip = (updatedTrip) => {
    const userId = localStorage.getItem("userId");
    const trips =
      JSON.parse(localStorage.getItem(`trips_${userId}`)) || [];

    const updatedTrips = trips.map((t) =>
      t.id === updatedTrip.id ? updatedTrip : t
    );

    localStorage.setItem(
      `trips_${userId}`,
      JSON.stringify(updatedTrips)
    );
  };

  /* 🔹 ADD ITEM */
  const addItem = () => {
    if (!itemText.trim()) return;

    checklist.items.push({
      text: itemText,
      done: false,
    });

    saveTrip(trip);
    setTrip({ ...trip });
    setItemText("");
  };

  /* 🔹 TOGGLE ITEM */
  const toggleItem = (i) => {
    checklist.items[i].done = !checklist.items[i].done;
    saveTrip(trip);
    setTrip({ ...trip });
  };

  /* 🔹 DELETE ITEM */
  const deleteItem = (i) => {
    checklist.items.splice(i, 1);
    saveTrip(trip);
    setTrip({ ...trip });
  };

  /* 🔹 EDIT ITEM */
  const saveEdit = (i) => {
    if (!editText.trim()) return;

    checklist.items[i].text = editText;
    saveTrip(trip);
    setTrip({ ...trip });
    setEditIndex(null);
    setEditText("");
  };

  /* 🔹 PROGRESS */
  const totalItems = checklist.items.length;
  const completedItems = checklist.items.filter(
    (item) => item.done
  ).length;

  const progressPercent =
    totalItems === 0
      ? 0
      : Math.round((completedItems / totalItems) * 100);

  return (
    <div className="container">
      <h2>{checklist.name}</h2>

      {/* ADD ITEM */}
      <div style={{ display: "flex", gap: "10px" }}>
        <input
          value={itemText}
          placeholder="Add checklist item"
          onChange={(e) => setItemText(e.target.value)}
        />
        <button onClick={addItem}>Add</button>
      </div>

      {/* PROGRESS BAR */}
      <div style={{ marginTop: "20px" }}>
        <div
          style={{
            height: "8px",
            background: "#e5e5e5",
            borderRadius: "5px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${progressPercent}%`,
              height: "100%",
              background:
                progressPercent === 100
                  ? "#2e7d32"
                  : "#4caf50",
              transition: "width 0.3s",
            }}
          />
        </div>

        <p style={{ marginTop: "6px", fontSize: "14px" }}>
          {completedItems} / {totalItems} done
        </p>
      </div>

      {/* ITEMS LIST */}
      <ul style={{ marginTop: "20px" }}>
        {checklist.items.map((item, i) => (
          <li
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "10px",
            }}
          >
            <input
              type="checkbox"
              checked={item.done}
              onChange={() => toggleItem(i)}
            />

            {editIndex === i ? (
              <>
                <input
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <button onClick={() => saveEdit(i)}>Save</button>
              </>
            ) : (
              <>
                <span
                  style={{
                    textDecoration: item.done
                      ? "line-through"
                      : "none",
                    cursor: "pointer",
                  }}
                  onClick={() => toggleItem(i)}
                >
                  {item.text}
                </span>
                <button
                  onClick={() => {
                    setEditIndex(i);
                    setEditText(item.text);
                  }}
                >
                  Edit
                </button>
              </>
            )}

            <button onClick={() => deleteItem(i)}>🗑</button>
          </li>
        ))}
      </ul>

      <button onClick={() => navigate(-1)}>Back</button>
    </div>
  );
};

export default ChecklistItems;
