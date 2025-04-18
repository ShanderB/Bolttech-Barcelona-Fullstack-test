import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/Home/Home';
import BookingPage from './pages/Booking/Booking';
import SuccessPage from './pages/Success/Success';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/booking" element={<BookingPage />} />
      <Route path="/success" element={<SuccessPage />} />
    </Routes>
  </Router>
);

export default App;