import { createSlice } from "@reduxjs/toolkit";

const savedExpenses = localStorage.getItem("expenses");

const initialState = {
  expenses: savedExpenses ? JSON.parse(savedExpenses) : [],
};

const expensesSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    addExpense: (state, action) => {
      state.expenses.push(action.payload);
      localStorage.setItem("expenses", JSON.stringify(state.expenses));
    },
    removeExpense: (state, action) => {
      state.expenses.splice(action.payload, 1);
      localStorage.setItem("expenses", JSON.stringify(state.expenses));
    },
  },
});

export const { addExpense, removeExpense } = expensesSlice.actions;
export default expensesSlice.reducer;
