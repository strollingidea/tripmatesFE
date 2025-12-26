import { createSlice } from "@reduxjs/toolkit";

// 🔹 Load checklist from localStorage
const savedChecklist = localStorage.getItem("checklist");

const initialState = {
  checklist: savedChecklist ? JSON.parse(savedChecklist) : [],
};

const checklistSlice = createSlice({
  name: "checklist",
  initialState,
  reducers: {
    addChecklistItem: (state, action) => {
      state.checklist.push(action.payload);

      // 🔹 Save to localStorage
      localStorage.setItem(
        "checklist",
        JSON.stringify(state.checklist)
      );
    },

    removeChecklistItem: (state, action) => {
      state.checklist = state.checklist.filter(
        (_, index) => index !== action.payload
      );

      // 🔹 Update localStorage
      localStorage.setItem(
        "checklist",
        JSON.stringify(state.checklist)
      );
    },

    clearChecklist: (state) => {
      state.checklist = [];
      localStorage.removeItem("checklist");
    },
  },
});

export const {
  addChecklistItem,
  removeChecklistItem,
  clearChecklist,
} = checklistSlice.actions;

export default checklistSlice.reducer;
