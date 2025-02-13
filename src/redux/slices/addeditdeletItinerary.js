import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    itinerary: "",
  };

  
  

const addeditdeletItinerarySlice = createSlice({
    name: "itinerary",
    initialState: initialState,
    reducers: {
        addItinerary: (state, action) => {
            state.itinerary = action.payload;
        },
        removeItinerary: (state, action) => {
            state.itinerary = "";
        },
        editItinerary: (state, action) => {
            state.itinerary = action.payload;
        },
    }
});

export const {addItinerary, removeItinerary, editItinerary} = addeditdeletItinerarySlice.actions;
export default addeditdeletItinerarySlice.reducer;