import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './Pages/Homepage';
import PlanTrip from './Pages/PlanTrip';
import './App.css';
import TripCreated from './Pages/TripCreated';

function App() {
  return (
    <>

      <Router>
        <Routes>
          <Route path="/" element={<Homepage/>} />
          <Route path="/plantrip" element={<PlanTrip />} />
          <Route path="/tripcreated" element={<TripCreated />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
