import './booking.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../shared/ThemeContext';
import {
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
  Paper,
} from '@mui/material';
import { createBooking } from '../../services/booking-service';

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
  const { isDarkMode } = useTheme();

  const handleSubmit = async () => {
    await createBooking({
      carId: car._id,
      userId: formData.userId,
      startDate,
      endDate,
      licenseValid: formData.licenseValid,
    }).then(() => {
      navigate('/success', { state: { car } });
    }).catch((error) => {
      alert('Error creating booking: ' + error.message);
    });
  };

  return (
    <div className="booking-overlay">
      <Paper className={`booking-paper ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
        <Typography variant="h5" gutterBottom>Confirm Booking</Typography>
        <Typography><strong>Brand:</strong> {car.brand}</Typography>
        <Typography><strong>Model:</strong> {car.model}</Typography>
        <Typography><strong>Price per day:</strong> ${car.price}</Typography>
        <Typography><strong>Total Price:</strong> ${car.totalPrice}</Typography>
        <Typography><strong>Start Date:</strong> {startDate}</Typography>
        <Typography><strong>End Date:</strong> {endDate}</Typography>
        <form className="booking-form">
          <TextField
            label="User ID"
            placeholder="Enter your User ID"
            value={formData.userId}
            onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
            fullWidth
            required
            className="text-field"
            InputProps={{
              className: isDarkMode ? 'dark-input' : 'light-input',
            }}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.licenseValid}
                onChange={(e) => setFormData({ ...formData, licenseValid: e.target.checked })}
                className={isDarkMode ? 'dark-checkbox' : 'light-checkbox'}
              />
            }
            label="License Valid"
          />
        </form>
        <div className="booking-buttons">
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Confirm Booking
          </Button>
          <Button variant="outlined" color="primary" onClick={closeModal}>
            Cancel
          </Button>
        </div>
      </Paper>
    </div>
  );
};

export default BookingPage;