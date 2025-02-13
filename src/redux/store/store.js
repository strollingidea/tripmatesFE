import { configureStore } from "@reduxjs/toolkit"; 
import removeTripmateSliceReducer from '../slices/removetripmateSlice.js';
import addeditdeletItinerarySliceReducer from '../slices/addeditdeletItinerary.js';


const store = configureStore({
    reducer: {
        tripmates: removeTripmateSliceReducer,
        itinerary: addeditdeletItinerarySliceReducer,
    }
})

export default store;