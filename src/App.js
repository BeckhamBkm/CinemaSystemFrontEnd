
import {Route, Routes} from 'react-router-dom';
import HomePage from './Components/HomePage';
import SeatBooking from './Components/SeatBooking';
import MovieDetail from './Components/MovieDetail';
import Login from './Auth/Login';
import { AuthProvider } from './Auth/AuthContext';


function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path='/details' element={<MovieDetail />}/>
        <Route path="/seatBooking" element={<SeatBooking />} />
        <Route path="*" element={<HomePage />} />
        </Routes>
       </AuthProvider>
    </div>
  );
}

export default App;
