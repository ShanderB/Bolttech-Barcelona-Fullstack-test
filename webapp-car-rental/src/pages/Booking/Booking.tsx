import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './booking.css';

interface BookingPageProps {
  car: {
    _id: number;
    brand: string;
    model: string;
    price: number;
    totalPrice: number;
  };
  startDate: string;
  endDate: string;
  closeModal: () => void;
}

const BookingPage: React.FC<BookingPageProps> = ({ car, startDate, endDate, closeModal }) => {
  const [formData, setFormData] = useState({
    userId: '',
    licenseValid: true,
  });

  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      await axios.post('http://localhost:5000/api/bookings', {
        carId: car._id,
        userId: formData.userId,
        startDate,
        endDate,
        licenseValid: formData.licenseValid,
      });
      navigate('/success', { state: { car } }); 
    } catch (error) {
      console.error('Error creating booking:', error);
      alert('Failed to create booking.');
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Confirm Booking</h2>
        <p><strong>Brand:</strong> {car.brand}</p>
        <p><strong>Model:</strong> {car.model}</p>
        <p><strong>Price per day:</strong> ${car.price}</p>
        <p><strong>Total Price:</strong> ${car.totalPrice}</p>
        <p><strong>Start Date:</strong> {startDate}</p>
        <p><strong>End Date:</strong> {endDate}</p>
        <form>
          <label>
            User ID:
            <input
              type="text"
              placeholder="Enter your User ID"
              value={formData.userId}
              onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
              required
            />
          </label>
          <label>
            License Valid:
            <input
              type="checkbox"
              checked={formData.licenseValid}
              onChange={(e) => setFormData({ ...formData, licenseValid: e.target.checked })}
            />
          </label>
        </form>
        <button className="booking-button" onClick={handleSubmit}>Confirm Booking</button>
        <button className="close-button" onClick={closeModal}>Cancel</button>
      </div>
    </div>
  );
};

export default BookingPage;