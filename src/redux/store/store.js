import { configureStore } from "@reduxjs/toolkit"; 
import removeTripmateSliceReducer from '../slices/removetripmateSlice.js';
const store = configureStore({
    reducer: {
        tripmates: removeTripmateSliceReducer,
    }
})

export default store;