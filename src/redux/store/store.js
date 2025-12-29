import { configureStore } from "@reduxjs/toolkit"; 
import removeTripmateSliceReducer from '../slices/removetripmateSlice.js';
import expensesSliceReducer from '../slices/expensesSlice.js';
import addeditdeletItinerarySliceReducer from '../slices/addeditdeletItinerary.js';


const store = configureStore({
    reducer: {
        tripmates: removeTripmateSliceReducer,
        expenses: expensesSliceReducer,
        itinerary: addeditdeletItinerarySliceReducer,
    }
})

export default store;