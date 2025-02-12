import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './Pages/Homepage';
import PlanTrip from './Pages/PlanTrip';
import './App.css';
import TripCreated from './Pages/TripCreated';
import { Provider } from "react-redux";
import store from './redux/store/store';

function App() {
  return (
    <>
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/" element={<Homepage/>} />
            <Route path="/plantrip" element={<PlanTrip />} />
            <Route path="/tripcreated" element={<TripCreated />} />
          </Routes>
        </Router>
      </Provider>
    </>
  );
}

export default App;
