
import {Route, Routes} from 'react-router-dom';
import HomePage from './Components/HomePage';
import SeatBooking from './Components/SeatBooking';


function App() {
  return (
    <div className="App">
      <Routes>
       <Route path="/" element={<HomePage />} />
       <Route path="/seatBooking" element={<SeatBooking />} />
       <Route path="*" element={<HomePage />} />
       </Routes>
    </div>
  );
}

export default App;
