import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './Pages/Homepage';
import PlanTrip from './Pages/PlanTrip';
import './App.css';
import TripCreated from './Pages/TripCreated';
import { Provider } from "react-redux";
import store from './redux/store/store';
import { SignUp } from './Component/signup/SignUp';
import ChecklistPage from "./Pages/ChecklistPage";
import Dashboard from './Pages/Dashboard';
import ChecklistItems from './Pages/ChecklistItems';

function App() {
  return (
    <>
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="signup" element={<SignUp/>} />
            <Route path="/" element={<Homepage/>} />
            <Route path="/dashboard" element={<Dashboard/>} />
            <Route path="/plantrip" element={<PlanTrip />} />
            {/* <Route path="/tripcreated" element={<TripCreated />} /> */}
            <Route path="/trip/:tripId" element={<TripCreated />} />
            {/* <Route path="/trip/:tripId/checklist/:checklistIndex" element={<ChecklistPage />} /> */}
            <Route path="/trip/:tripId/checklist/:index" element={<ChecklistItems />} />
          </Routes>
        </Router>
      </Provider>
    </>
  );
}

export default App;
