import { createSlice } from "@reduxjs/toolkit";

// 🔹 Load tripmates from localStorage
const savedTripmates = localStorage.getItem("tripmates");

const initialState = {
  tripmates: savedTripmates ? JSON.parse(savedTripmates) : [],
};

const removeTripmateSlice = createSlice({
  name: "tripmates",
  initialState,
  reducers: {
    addTripmate: (state, action) => {
      state.tripmates.push(action.payload);

      // 🔹 Save to localStorage
      localStorage.setItem(
        "tripmates",
        JSON.stringify(state.tripmates)
      );
    },

    removeTripmate: (state, action) => {
      state.tripmates = state.tripmates.filter(
        (_, index) => index !== action.payload
      );

      // 🔹 Update localStorage
      localStorage.setItem(
        "tripmates",
        JSON.stringify(state.tripmates)
      );
    },
  },
});

export const { addTripmate, removeTripmate } =
  removeTripmateSlice.actions;

export default removeTripmateSlice.reducer;
