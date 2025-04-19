import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useTheme } from '../../shared/ThemeContext';
import {
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
  Paper,
} from '@mui/material';

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
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Paper
        style={{
          padding: '20px',
          borderRadius: '8px',
          maxWidth: '400px',
          width: '100%',
          backgroundColor: isDarkMode ? '#333' : '#fff',
          color: isDarkMode ? '#fff' : '#000',
        }}
      >
        <Typography variant="h5" gutterBottom>
          Confirm Booking
        </Typography>
        <Typography>
          <strong>Brand:</strong> {car.brand}
        </Typography>
        <Typography>
          <strong>Model:</strong> {car.model}
        </Typography>
        <Typography>
          <strong>Price per day:</strong> ${car.price}
        </Typography>
        <Typography>
          <strong>Total Price:</strong> ${car.totalPrice}
        </Typography>
        <Typography>
          <strong>Start Date:</strong> {startDate}
        </Typography>
        <Typography>
          <strong>End Date:</strong> {endDate}
        </Typography>
        <form style={{ marginTop: '20px' }}>
          <TextField
            label="User ID"
            placeholder="Enter your User ID"
            value={formData.userId}
            onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
            fullWidth
            required
            style={{
              marginBottom: '20px',
              backgroundColor: isDarkMode ? '#444' : '#fff',
            }}
            InputProps={{
              style: { color: isDarkMode ? '#fff' : '#000' },
            }}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.licenseValid}
                onChange={(e) => setFormData({ ...formData, licenseValid: e.target.checked })}
                style={{ color: isDarkMode ? '#fff' : '#000' }}
              />
            }
            label="License Valid"
          />
        </form>
        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
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