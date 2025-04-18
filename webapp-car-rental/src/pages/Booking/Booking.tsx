import React, { useState } from 'react';
import axios from 'axios';

const BookingPage = () => {
  const [formData, setFormData] = useState({
    carId: '',
    userId: '',
    startDate: '',
    endDate: '',
    licenseValid: false,
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await axios.post('/api/bookings', formData);
    alert('Booking created!');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Car ID" onChange={(e) => setFormData({ ...formData, carId: e.target.value })} />
      <input type="text" placeholder="User ID" onChange={(e) => setFormData({ ...formData, userId: e.target.value })} />
      <input type="date" onChange={(e) => setFormData({ ...formData, startDate: e.target.value })} />
      <input type="date" onChange={(e) => setFormData({ ...formData, endDate: e.target.value })} />
      <button type="submit">Book</button>
    </form>
  );
};

export default BookingPage;