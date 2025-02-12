import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tripmates: [],
  };
  

const removeTripmateSlice = createSlice({
    name: "tripmates",
    initialState: initialState,
    reducers: {
        addTripmate: (state, action) => {
            state.tripmates.push(action.payload);
        },
        removeTripmate: (state, action) => {
            state.tripmates = state.tripmates.filter((_, index) => index !== action.payload);
        },
    }
});

export const {addTripmate, removeTripmate} = removeTripmateSlice.actions;
export default removeTripmateSlice.reducer;