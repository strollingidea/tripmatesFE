import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    itinerary: [],
  };

  
  

const addeditdeletItinerarySlice = createSlice({
    name: "itinerary",
    initialState,
    reducers: {
        // addItinerary: (state, action) => {
        //     state.itinerary.push(action.payload);
        //     // state.itinerary = action.payload;
        // },
        // removeItinerary: (state, action) => {
        //     state.itinerary = state.itinerary.filter((_, index) => index !== action.payload);
        // },
        // editItinerary: (state, action) => {
        //     state.itinerary = action.payload;
        // },

        addItinerary: (state, action) => {
            const { dayIndex, note } = action.payload;
            if (!state.itinerary[dayIndex]) {
                state.itinerary[dayIndex] = []; // Initialize array if not present
            }
            state.itinerary[dayIndex].push(note);
        },
        removeItinerary: (state, action) => {
            const { dayIndex, noteIndex } = action.payload;
            state.itinerary[dayIndex] = state.itinerary[dayIndex].filter((_, i) => i !== noteIndex);
        },
    }
});

export const {addItinerary, removeItinerary, editItinerary} = addeditdeletItinerarySlice.actions;
export default addeditdeletItinerarySlice.reducer;