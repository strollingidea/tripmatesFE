import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddExpenses from "../PopModals/AddExpenses";
import { addExpense, removeExpense } from "../../redux/slices/expensesSlice";

const Budget = () => {
  const dispatch = useDispatch();
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [activeTab, setActiveTab] = useState("summary"); // 👈 TAB STATE

  const expenses = useSelector((state) => state.expenses.expenses);
  const tripmates = useSelector((state) => state.tripmates.tripmates);

  const handleAddExpense = (expense) => {
    dispatch(addExpense(expense));
  };

  const handleRemoveExpense = (index) => {
    dispatch(removeExpense(index));
  };

  // 🔹 Total Expense
  const totalExpense = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  // 🔹 Tripmate-wise Expense
  const tripmateTotals = expenses.reduce((acc, expense) => {
    if (!acc[expense.paidBy]) acc[expense.paidBy] = 0;
    acc[expense.paidBy] += expense.amount;
    return acc;
  }, {});

  return (
    <>
      {/* 🔹 TAB HEADINGS (same heading class) */}
      <div className="overview-checklists" style={{ marginTop: "10px" }}>
        <div className="tripmateslist-heading">
          <h2
            style={{ cursor: "pointer", opacity: activeTab === "summary" ? 1 : 0.5 }}
            onClick={() => setActiveTab("summary")}
          >
            Summary
          </h2>

          <h2
            style={{ cursor: "pointer", opacity: activeTab === "expenses" ? 1 : 0.5 }}
            onClick={() => setActiveTab("expenses")}
          >
            Expenses
          </h2>

          {activeTab === "expenses" && (
            <div className="addmembers">
              <h2 onClick={() => setShowAddExpense(true)}>+</h2>
            </div>
          )}
        </div>
      </div>

      {/* ================= SUMMARY TAB ================= */}
      {activeTab === "summary" && (
        <div className="overview-checklists" style={{ marginTop: "10px" }}>
          {expenses.length > 0 ? (
            <div className="tripmate-expenses">
              <h2>Tripmate Expenses</h2>
              <ul>
                {Object.entries(tripmateTotals).map(
                  ([name, amount]) => (
                    <li key={name}>
                      <h3>{name}</h3>
                      <h3>₹ {amount}</h3>
                    </li>
                  )
                )}

                <li style={{ borderTop: "1px solid #ccc", marginTop: "8px" }}>
                  <h3>Total</h3>
                  <h3>₹ {totalExpense}</h3>
                </li>
              </ul>
            </div>
          ) : (
            <p className="no-tripmates">No Expenses added yet</p>
          )}
        </div>
      )}

      {/* ================= EXPENSES TAB ================= */}
      {activeTab === "expenses" && (
        <div className="overview-checklists" style={{ marginTop: "10px" }}>
          {expenses.length === 0 && (
            <p className="no-tripmates">No Expenses added yet</p>
          )}

          <div className="expenses-list">
            <ul>
              {expenses.map((expense, index) => (
                <li key={expense.id}>
                  <div>
                    <h4>Paid by: {expense.paidBy}</h4>
                    <h3>₹ {expense.amount}</h3>
                    <p>{expense.name}</p>
                  </div>

                  <h5 onClick={() => handleRemoveExpense(index)}>
                    Remove
                  </h5>
                </li>
              ))}
            </ul>
          </div>

          {showAddExpense && (
            <AddExpenses
              onAdd={handleAddExpense}
              onClose={() => setShowAddExpense(false)}
              tripmates={tripmates}
            />
          )}
        </div>
      )}
    </>
  );
};

export default Budget;
